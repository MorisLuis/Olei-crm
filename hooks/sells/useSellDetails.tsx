import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SellsDetailsInterface, SellsInterface } from '@/interface/sells';
import { getSellById, getSellDetails, getSellDetailsCount } from '@/services/sells/sells.service';
import { isValidTipoDoc } from '@/utils/validators/isValidTipoDoc';
import { parseSellId } from '@/utils/parse/parseSellId';
import { useQueryPaginationWithFilters } from '../useQueryPaginationWithFilters';

interface UseSellDetailsReturn {
    sellInformation?: SellsInterface;
    items: SellsDetailsInterface[];
    sellsCount?: number;
    isLoading: boolean;
    error: unknown;
    loadMore: () => void;
    refetch: () => void;
}

/**
 * Custom hook para manejar toda la lógica de obtener detalles de una venta.
 */

export function useSellDetails(): UseSellDetailsReturn {
    const [sellInformation, setSellInformation] = useState<SellsInterface>();
    const [items, setItems] = useState<SellsDetailsInterface[]>([]);
    const [sellsCount, setSellsCount] = useState<number>();
    const [page, setPage] = useState(1);

    const searchParams = useSearchParams();
    const Sellid = searchParams.get('sellId');
    const parsed = parseSellId(Sellid ?? '');

    const Id_Almacen = parsed?.Id_Almacen ?? null;
    const TipoDoc = parsed?.TipoDoc ?? null;
    const Serie = parsed?.Serie ?? null;
    const Folio = parsed?.Folio ?? null;

    const enabled = !!Folio && isValidTipoDoc(TipoDoc);

    // Hook paginación SIEMPRE se llama
    const { data, error, isLoading, refetch } = useQueryPaginationWithFilters<
        { orderDetails: SellsDetailsInterface[] },
        { PageNumber: number }
    >(
        [`sell-${Sellid}`, page],
        ({ PageNumber }) => getSellDetails({ Folio: Folio!, PageNumber, TipoDoc: TipoDoc! }),
        { PageNumber: page },
        { enabled }
    );

    const handleGetTotals = useCallback(async () => {
        if (!Folio) return;
        const { total } = await getSellDetailsCount(Folio);
        setSellsCount(total);
    }, [Folio]);

    const handleGetSellInformation = useCallback(async () => {
        if (!Sellid || Id_Almacen == null || TipoDoc == null || Folio == null || Serie == null) return;

        if (!isValidTipoDoc(TipoDoc)) {
            setSellInformation(undefined);
            return;
        };

        const { sell } = await getSellById({
            Id_Almacen,
            TipoDoc,
            Serie,
            Folio,
        });

        setSellInformation(sell);
    }, [Sellid, Id_Almacen, TipoDoc, Serie, Folio]);

    useEffect(() => {
        if (enabled) {
            handleGetTotals();
            handleGetSellInformation();
        }
    }, [enabled, handleGetTotals, handleGetSellInformation]);

    useEffect(() => {
        setPage(1);
        setItems([]);
    }, []);

    useEffect(() => {
        if (data?.orderDetails) setItems((prev) => [...prev, ...data.orderDetails]);
    }, [data]);

    const loadMore = () => {
        setPage((p) => p + 1);
    };

    // Validación después de hooks
    if (!parsed || !isValidTipoDoc(parsed.TipoDoc)) {
        return {
            sellInformation: undefined,
            items: [],
            sellsCount: 0,
            isLoading: false,
            error: new Error('Invalid sellId or TipoDoc'),
            loadMore: () => { },
            refetch: () => { },
        };
    }

    return {
        sellInformation,
        items,
        sellsCount,
        isLoading: !enabled || isLoading,
        error,
        loadMore,
        refetch,
    };
}
