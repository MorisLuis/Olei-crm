import { SellsInterface } from "@/interface/sells";
import { SellsByClientFilters, TotalSellsResponse } from "@/services/sells/sells.interface";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryPaginationWithFilters } from "../useQueryPaginationWithFilters";
import { getSellsByClient, getSellsByClientCountAndTotal } from "@/services/sells/sells.service";
import { useSearchParams } from "next/navigation";
import { isEqual } from "lodash";

interface UseSellsByClientReturn {
    error: unknown;
    refetch: () => void;
    isLoading: boolean;
    items: SellsInterface[];
    sellsCount: number;
    clientName: string;
    sellsTotal: TotalSellsResponse | null;
    loadMore: () => void;
};

/**
 * Custom hook para manejar toda la lógica de obtener las ventas.
 */

export function useSellsByClient(clientId: number, filters: SellsByClientFilters): UseSellsByClientReturn {

    const searchParams = useSearchParams();

    const [page, setPage] = useState(1);
    const [items, setItems] = useState<SellsInterface[]>([]);
    const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
    const [sellsCount, setSellsCount] = useState<number>(0);
    const prevFiltersRef = useRef<SellsByClientFilters>();
    
    const clientName = searchParams.get('client') ?? 'Regresar';

    const queryKey = [
        `sells-client-${clientId}`,
        page,
        ...(filters.DateStart ? [`dateStart-${filters.DateStart}`] : []),
        ...(filters.DateEnd ? [`dateEnd-${filters.DateEnd}`] : []),
    ];

    const { data, error, isLoading, refetch } =
        useQueryPaginationWithFilters<{ sells: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
            queryKey,
            ({ PageNumber, filters }) => getSellsByClient({ client: Number(clientId), PageNumber, filters }),
            { PageNumber: page, filters }
        );

    const handleGetTotals = useCallback(async (): Promise<void> => {

        const { total, count } = await getSellsByClientCountAndTotal({
            filters: filters as SellsByClientFilters,
            client: Number(clientId)
        })

        setSellsTotal(total);
        setSellsCount(count)
    }, [filters, clientId])

    useEffect(() => {
        handleGetTotals()
    }, [handleGetTotals, filters])

    useEffect(() => {
        if (!isEqual(filters, prevFiltersRef.current)) {
            setPage(1);
            setItems([]);
            prevFiltersRef.current = filters; // actualización sincronizada
        }
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
        sellsCount,
        clientName,
        sellsTotal,
        loadMore
    }
}