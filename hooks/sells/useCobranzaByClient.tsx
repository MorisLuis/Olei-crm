import { SellsInterface } from "@/interface/sells";
import { useQueryPaginationWithFilters } from "../useQueryPaginationWithFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCobranzaByClient, getCobranzaByClientCountAndTotal } from "@/services/cobranza/cobranza.service";
import { CobranzaByClientFilters, TotalCobranzaResponse } from "@/services/cobranza/cobranza.interface";
import { useCallback, useEffect, useState } from "react";


interface useCobranzaByClientReturn {
    sellInformation?: SellsInterface;
    items: SellsInterface[];
    cobranzaCount?: number;
    cobranzaByClientTotal: TotalCobranzaResponse | null;
    isLoading: boolean;
    error: unknown;
    loadMore: () => void;
    refetch: () => void;
    handleSelectItem: (item: SellsInterface) => void;
}

export function useCobranzaByClient(filters: any): useCobranzaByClientReturn {

    const pathname = usePathname();
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const Id_Cliente = pathname.split('/').filter(Boolean)[2];
    const Id_Almacen = searchParams.get('Id_Almacen') ?? '';
    const sellId = searchParams.get('sellId');

    const clientName = searchParams.get('client') ?? 'Regresar';
    const email = searchParams.get('email') ?? '';

    const [cobranzaItems, setCobranzaItems] = useState<SellsInterface[]>([]);
    const [page, setPage] = useState(1);
    const [cobranzaByClientTotal, setCobranzaByClientTotal] = useState<TotalCobranzaResponse | null>(null);
    const [cobranzaCount, setCobranzaCount] = useState<number>();

    const { data, error, isLoading, refetch } = useQueryPaginationWithFilters<{ cobranza: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
        [`cobranzaByClient-${Id_Cliente}-${Id_Almacen}`, page, filters],
        ({ PageNumber, filters }) =>
            getCobranzaByClient({
                client: Number(Id_Cliente),
                Id_Almacen: Number(Id_Almacen),
                PageNumber,
                filters: filters as CobranzaByClientFilters,
            }),
        { PageNumber: page, filters },
    );
    const cobranza = data?.cobranza;

    const loadMore = (): void => setPage((prev) => prev + 1);

    const handleSelectItem = (item: SellsInterface): void => {
        const params = new URLSearchParams({
            Id_Almacen,
            client: clientName,
            email,
        });
        params.set('sellId', item.UniqueKey ?? "");
        push(`/dashboard/cobranza/${Id_Cliente}?${params.toString()}`);
    };


    const handleGetTotals = useCallback(async (): Promise<void> => {
        const { total, count } = await getCobranzaByClientCountAndTotal({
            client: Number(Id_Cliente),
            Id_Almacen: Number(Id_Almacen),
            filters: filters as CobranzaByClientFilters,
        });

        setCobranzaByClientTotal(total);
        setCobranzaCount(count);
    }, [Id_Cliente, Id_Almacen, filters]);

    useEffect(() => {
        if (!Id_Cliente) return;
        const shouldGetTotals = !sellId || (sellId && cobranzaItems.length === 0);
        if (shouldGetTotals) handleGetTotals();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Id_Cliente, sellId, filters]);

    useEffect(() => {
        if (!sellId) {
            setCobranzaItems([]);
            setPage(1);
        }
    }, [filters, sellId]);

    useEffect(() => {
        if (!cobranza) return;
        const shouldAppend = !sellId || (sellId && cobranzaItems.length === 0);
        if (shouldAppend) setCobranzaItems((prev) => [...prev, ...cobranza]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cobranza, sellId]);

    return {
        items: cobranzaItems,
        error,
        refetch,
        loadMore,
        isLoading,
        cobranzaCount,
        cobranzaByClientTotal,
        handleSelectItem
    }
}