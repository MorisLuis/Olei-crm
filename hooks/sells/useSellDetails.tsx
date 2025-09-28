import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SellsDetailsInterface, SellsInterface } from '@/interface/sells';
import { getSellById, getSellDetails, getSellDetailsCount } from '@/services/sells/sells.service';
import { isValidTipoDoc } from '@/utils/validators/isValidTipoDoc';
import { parseSellId } from '@/utils/parse/parseSellId';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseSellDetailsReturn {
    sellInformation?: SellsInterface | null | undefined;
    items: SellsDetailsInterface[];
    sellsCount?: number;
    error: unknown;
    fetchNextPage: () => void;
    refetch: () => void;

    isLoading: boolean;
    isFetchingNextPage: boolean,
    isLoadingTotals: boolean,
    isEnabled: boolean
}

/**
 * Custom hook para manejar toda la lógica de obtener detalles de una venta.
 */

export function useSellDetails(): UseSellDetailsReturn {

    const [sellInformation, setSellInformation] = useState<SellsInterface | null | undefined>(null);
    const [sellsCount, setSellsCount] = useState<number>();
    const [isLoadingTotals, setIsLoadingTotals] = useState(true);

    const searchParams = useSearchParams();
    const Sellid = searchParams.get('sellId');
    const parsed = parseSellId(Sellid ?? '');

    const Id_Almacen = parsed?.Id_Almacen ?? null;
    const TipoDoc = parsed?.TipoDoc ?? null;
    const Serie = parsed?.Serie ?? null;
    const Folio = parsed?.Folio ?? null;

    const isEnabled = !!Folio && !!TipoDoc

    const fetchTotals = useCallback(async () => {
        if (!Folio || !TipoDoc) return;
        setIsLoadingTotals(true)
        const { total } = await getSellDetailsCount({
            folio: Folio,
            TipoDoc: TipoDoc
        });
        setSellsCount(total);
        setIsLoadingTotals(false)
    }, [Folio, TipoDoc]);

    const fetchSellInformation = useCallback(async () => {
        if (!Sellid || Id_Almacen == null || TipoDoc == null || Folio == null || Serie == null) {
            setSellInformation(null);
            return;
        };

        if (!isValidTipoDoc(TipoDoc)) {
            setSellInformation(null);
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

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ orderDetails: SellsDetailsInterface[] }, Error>({
        queryKey: [`sell-${Sellid}`],
        queryFn: ({ pageParam = 1 }) => getSellDetails({ folio: Folio!, PageNumber: pageParam as number, TipoDoc: TipoDoc! }),
        getNextPageParam: (lastPage, allPages) => lastPage.orderDetails.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        enabled: isEnabled
    });

    const items = data?.pages.flatMap(page => page.orderDetails) ?? [];

    useEffect(() => {
        fetchTotals();
    }, [fetchTotals]);

    useEffect(() => {
        fetchSellInformation()
    }, [fetchSellInformation]);

    return {
        sellInformation,
        items,
        sellsCount,
        error,
        fetchNextPage,
        refetch,

        isLoading,
        isFetchingNextPage,
        isLoadingTotals,
        isEnabled
    };
}
