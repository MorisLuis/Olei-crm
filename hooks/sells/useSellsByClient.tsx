import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import qs from 'qs';

import { SellsInterface } from '@/interface/sells';
import { SellsByClientFilters, TotalSellsResponse } from '@/services/sells/sells.interface';
import { getSellsByClient, getSellsByClientCountAndTotal } from '@/services/sells/sells.service';
import { useSearchParams } from 'next/navigation';

interface UseSellsByClientReturn {
    error: unknown;
    refetch: () => void;
    isLoading: boolean;
    items: SellsInterface[];
    sellsCount: number;
    clientName: string;
    sellsTotal: TotalSellsResponse | null;
    loadMore: () => void;
    hasMore: boolean;
}

export function useSellsByClient(
    clientId: number,
    filters: SellsByClientFilters
): UseSellsByClientReturn {

    const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
    const [sellsCount, setSellsCount] = useState<number>(0);

    const searchParams = useSearchParams();
    const clientName = searchParams.get('client') ?? 'Regresar';

    // Get totals
    const fetchTotals = useCallback(async () => {
        const { total, count } = await getSellsByClientCountAndTotal({ filters, client: clientId });
        setSellsTotal(total);
        setSellsCount(count);
    }, [filters, clientId]);

    useEffect(() => {
        fetchTotals();
    }, [fetchTotals]);

    // Serialize the filters to the queryKey.
    const serializedFilters = qs.stringify(filters, {
        skipNulls: true,
        sort: (a, b) => a.localeCompare(b),
    });

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ sells: SellsInterface[] }, Error>({
        queryKey: ['sells-client', clientId, serializedFilters],
        queryFn: ({ pageParam = 1 }) => getSellsByClient({ client: clientId, PageNumber: pageParam as number, filters }),
        getNextPageParam: (lastPage, allPages) => lastPage.sells.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
    });

    // Combinamos todas las páginas en un solo array
    const items = data?.pages.flatMap(page => page.sells) ?? [];

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return {
        error,
        refetch,
        isLoading,
        items,
        sellsCount,
        clientName,
        sellsTotal,
        loadMore,
        hasMore: !!hasNextPage,
    };
}
