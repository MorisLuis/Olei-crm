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

    // Validación inicial
    if (!parsed || !isValidTipoDoc(parsed.TipoDoc)) {
        // Manejar aquí error o return temprano
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

    const { Id_Almacen, TipoDoc, Serie, Folio } = parsed;
    const enabled = !!Folio;

    // Hook paginación
    const { data, error, isLoading, refetch } = useQueryPaginationWithFilters<
        { orderDetails: SellsDetailsInterface[] },
        { PageNumber: number }
    >(
        [`sell-${Sellid}`, page],
        ({ PageNumber }) => getSellDetails({ Folio: Folio, PageNumber, TipoDoc }),
        { PageNumber: page },
        { enabled }
    );

    // Función para obtener total de detalles
    const handleGetTotals = useCallback(async () => {
        if (!Folio) return;
        const { total } = await getSellDetailsCount(Folio);
        setSellsCount(total);
    }, [Folio]);

    // Función para obtener información general de la venta
    const handleGetSellInformation = useCallback(async () => {
        if (!Sellid || Id_Almacen == null || TipoDoc == null || Folio == null) return;

        if (!isValidTipoDoc(TipoDoc)) {
            setSellInformation(undefined);
            return;
        }

        const { sell } = await getSellById({
            Id_Almacen,
            TipoDoc,
            Serie,
            Folio,
        });

        setSellInformation(sell);
    }, [Sellid, Id_Almacen, TipoDoc, Serie, Folio]);

    // Cargar info al iniciar y cuando cambien dependencias
    useEffect(() => {
        handleGetTotals();
        handleGetSellInformation();
    }, [handleGetTotals, handleGetSellInformation]);

    // Resetear página e items cuando el hook se monta.
    useEffect(() => {
        setPage(1);
        setItems([]);
    }, []);

    // Cuando llega nueva data de detalles, la agregamos.
    useEffect(() => {
        if (data?.orderDetails) setItems((prev) => [...prev, ...data.orderDetails]);
    }, [data]);

    // Función para cargar más página
    const loadMore = () => {
        setPage((p) => p + 1);
    };

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
