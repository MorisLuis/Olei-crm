import { SellsInterface } from "@/interface/sells";
import { usePathname, useSearchParams } from "next/navigation";
import { getCobranzaByClient, getCobranzaByClientCountAndTotal } from "@/services/cobranza/cobranza.service";
import { CobranzaByClientFilters, TotalCobranzaResponse } from "@/services/cobranza/cobranza.interface";
import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";


interface useCobranzaByClientReturn {
    sellInformation?: SellsInterface;
    items: SellsInterface[];
    cobranzaCount?: number;
    cobranzaByClientTotal: TotalCobranzaResponse | null;
    error: unknown;
    loadMore: () => void;
    refetch: () => void;
    isFetchingNextPage: boolean,
    isLoading: boolean,
    isLoadingTotals: boolean
}

export function useCobranzaByClient(filters: any): useCobranzaByClientReturn {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const Id_Cliente = pathname.split('/').filter(Boolean)[2];
    const Id_Almacen = searchParams.get('Id_Almacen') ?? '';

    const [cobranzaByClientTotal, setCobranzaByClientTotal] = useState<TotalCobranzaResponse | null>(null);
    const [cobranzaCount, setCobranzaCount] = useState<number>();
    const [isLoadingTotals, setIsLoadingTotals] = useState(true);

    const fetchTotals = useCallback(async (): Promise<void> => {
        setIsLoadingTotals(true)
        const { total, count } = await getCobranzaByClientCountAndTotal({
            client: Number(Id_Cliente),
            Id_Almacen: Number(Id_Almacen),
            filters: filters as CobranzaByClientFilters,
        });

        setCobranzaByClientTotal(total);
        setCobranzaCount(count);
        setIsLoadingTotals(false)
    }, [Id_Cliente, Id_Almacen, filters]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ cobranza: SellsInterface[] }, Error>({
        queryKey: [`cobranzaByClient-${Id_Cliente}-${Id_Almacen}`, filters],
        queryFn: ({ pageParam = 1 }) =>
            getCobranzaByClient({
                client: Number(Id_Cliente),
                Id_Almacen: Number(Id_Almacen),
                PageNumber: pageParam as number,
                filters: filters as CobranzaByClientFilters,
            }),
        getNextPageParam: (lastPage, allPages) => lastPage.cobranza.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5 // Five minutes
    });
    const items = data?.pages.flatMap(page => page.cobranza) ?? [];

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        fetchTotals();
    }, [fetchTotals]);

    return {
        items,
        error,
        refetch,
        loadMore,
        cobranzaCount,
        cobranzaByClientTotal,
        isFetchingNextPage,
        isLoading,
        isLoadingTotals
    }
}