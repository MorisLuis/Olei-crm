import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import qs from 'qs';

import { SellsInterface } from '@/interface/sells';
import { SellsByClientFilters, TotalSellsResponse } from '@/services/sells/sells.interface';
import { getSellsByClient, getSellsByClientCountAndTotal } from '@/services/sells/sells.service';
import { useSearchParams } from 'next/navigation';

interface UseSellsByClientReturn {
    error: unknown;
    refetch: () => void;
    items: SellsInterface[];
    sellsCount: number;
    clientName: string;
    sellsTotal: TotalSellsResponse | null;
    loadMore: () => void;

    hasMore: boolean;
    isLoading: boolean;
    isLoadingTotals: boolean;
    isFetchingNextPage: boolean;
}

export function useSellsByClient(
    clientId: number,
    filters: SellsByClientFilters
): UseSellsByClientReturn {

    const searchParams = useSearchParams();
    const clientName = searchParams.get('client') ?? 'Regresar';
    
    const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
    const [sellsCount, setSellsCount] = useState<number>(0);
    const [isLoadingTotals, setIsLoadingTotals] = useState(true)    

    // Get totals
    const fetchTotals = useCallback(async () => {
        setIsLoadingTotals(true)
        const { total, count } = await getSellsByClientCountAndTotal({ filters, client: clientId });
        setSellsTotal(total);
        setSellsCount(count);
        setIsLoadingTotals(false)
    }, [filters, clientId]);

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
        staleTime: 1000 * 60 * 5 // Five minutes
    });

    // Combine all the pages in one array.
    const items = data?.pages.flatMap(page => page.sells) ?? [];

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        fetchTotals();
    }, [fetchTotals]);

    return {
        error,
        refetch,
        items,
        sellsCount,
        clientName,
        sellsTotal,
        loadMore,
        hasMore: !!hasNextPage,
        isFetchingNextPage,
        isLoading,
        isLoadingTotals
    };
}
