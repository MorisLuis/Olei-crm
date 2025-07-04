import { SellsInterface } from "@/interface/sells";
import { useQueryPaginationWithFilters } from "../useQueryPaginationWithFilters";
import { useCallback, useEffect, useState } from "react";
import { SellsFilters, TotalSellsResponse } from "@/services/sells/sells.interface";
import { getSells, getSellsCountAndTotal } from "@/services/sells/sells.service";


interface UseSellsReturn {
    error: unknown;
    refetch: () => void;
    isLoading: boolean;
    items: SellsInterface[];
    loadMore: () => void;
    sellsCount: number;
    sellsTotal: TotalSellsResponse | null;
}

export function useSells(filters: any): UseSellsReturn {
    

    const [page, setPage] = useState(1);
    const [items, setItems] = useState<SellsInterface[]>([]);
    const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
    const [sellsCount, setSellsCount] = useState<number>(0);



    // queryKey con solo los filtros presentes
    const queryKey = [
        'sells',
        page,
        ...(filters.DateStart ? [`dateStart-${filters.DateStart}`] : []),
        ...(filters.DateEnd ? [`dateEnd-${filters.DateEnd}`] : []),
    ];

    const { data, error, isLoading, refetch } =
        useQueryPaginationWithFilters<{ sells: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
            queryKey,
            ({ PageNumber, filters }) => getSells({ PageNumber, filters }),
            { PageNumber: page, filters }
        );

    const handleGetTotals = useCallback(async (): Promise<void> => {
        const { total, count } = await getSellsCountAndTotal({
            filters: filters as SellsFilters
        })

        setSellsTotal(total);
        setSellsCount(count)
    }, [filters])


    useEffect(() => {
        handleGetTotals()
    }, [handleGetTotals, filters])

    useEffect(() => {
        setPage(1);
        setItems([]);
    }, [filters]);

    useEffect(() => {
        if (data?.sells) {
            setItems(prev => [...prev, ...data.sells]);
        }
    }, [data]);

    // Función para cargar más página
    const loadMore = () => {
        setPage((p) => p + 1);
    };
    return {
        error,
        refetch,
        isLoading,
        items,
        loadMore,
        sellsTotal,
        sellsCount
    }
}