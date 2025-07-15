import { SellsInterface } from "@/interface/sells";
import { useCallback, useEffect, useState } from "react";
import { SellsFilters, TotalSellsResponse } from "@/services/sells/sells.interface";
import { getSells, getSellsCountAndTotal } from "@/services/sells/sells.service";
import { useInfiniteQuery } from "@tanstack/react-query";


interface UseSellsReturn {
    error: unknown;
    refetch: () => void;
    items: SellsInterface[];
    loadMore: () => void;
    sellsCount: number;
    sellsTotal: TotalSellsResponse | null;
    isLoading: boolean;
    isFetchingNextPage: boolean,
    isLoadingTotals: boolean
}

export function useSells(filters: any): UseSellsReturn {

    const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
    const [sellsCount, setSellsCount] = useState<number>(0);
    const [isLoadingTotals, setIsLoadingTotals] = useState(true);

    const fetchTotals = useCallback(async (): Promise<void> => {
        setIsLoadingTotals(true)
        const { total, count } = await getSellsCountAndTotal({
            filters: filters as SellsFilters
        })

        setSellsTotal(total);
        setSellsCount(count)
        setIsLoadingTotals(false)
    }, [filters])

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ sells: SellsInterface[] }, Error>({
        queryKey: ['sells', filters],
        queryFn: ({ pageParam = 1 }) => getSells({ PageNumber: pageParam as number, filters }),
        getNextPageParam: (lastPage, allPages) => lastPage.sells.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5 // Five minutes
    });
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
        loadMore,
        sellsTotal,
        sellsCount,
        isFetchingNextPage,
        isLoading,
        isLoadingTotals
    }
}