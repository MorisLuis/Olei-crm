
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Custum500 from '@/components/500';
import Header from '@/components/navigation/header';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { AbonosInterface } from '@/interface/abonos';
import { AbonosFilterSchema } from '@/schemas/abonosFilters.schema';
import { getAbonos } from '@/services/abonos/abonos.service';
import TableAbonos from './abonosTable';


function AbonosContent(): JSX.Element {

    //const router = useRouter()
    /* const [cobranzaTotal, setCobranzaTotal] = useState<TotalCobranzaResponse | null>(null);
    const [isLoadingTotals, setIsLoadingTotals] = useState(true) */
    const { filters, /* updateFilter, updateFilters, removeFilter, removeFilters */ } = useUrlFilters(AbonosFilterSchema)

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ abonos: AbonosInterface[], total: number }, Error>({
        queryKey: ['cobranza', filters],
        queryFn: ({ pageParam = 1 }) => getAbonos({ PageNumber: pageParam as number, filters }),
        getNextPageParam: (lastPage, allPages) => lastPage.abonos.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5
    });
    const items = data?.pages.flatMap(page => page.abonos) ?? [];
    const itemsTotal = data?.pages.flatMap(page => page.total)[0] ?? 0;

    const handleSelectItem = (_item: AbonosInterface): void => {
        /* const params = new URLSearchParams({
            Id_Almacen: item.Id_Almacen.toString(),
            client: item.Nombre.trim(),
            email: item.CorreoVtas.trim() ?? '',
        });
        router.push(`/dashboard/cobranza/${item.Id_Cliente}?${params.toString()}`); */
    };

    /* const handleGetTotals = useCallback(async (): Promise<void> => {
        setIsLoadingTotals(true)
        const { total, count } = await getCobranzaCountAndTotal({
            filters: filters as CobranzaFilters
        })
        setCobranzaTotal(total);
        setCobranzaCount(count)
        setIsLoadingTotals(false);
    }, [filters])

    useEffect(() => {
        handleGetTotals()
    }, [handleGetTotals, filters]) */

    if (error) return <Custum500 handleRetry={refetch} />;

    return (
        <>
            <Header title="Abonos" dontShowBack />
            {/* <HeaderStats
                items={abonosStats(cobranzaTotal)}
                isLoading={isLoadingTotals}
                sizeSkeleton={3}
            /> */}

            {/* <FilterBar
                filters={filters}
                config={abonosFiltersConfig}
                updateFilter={updateFilter}
                updateFilters={updateFilters}
                removeFilter={removeFilter}
                removeFilters={removeFilters}
                isLoading={isLoading}
            /> */}

            <TableAbonos
                abonos={items}
                totalAbonos={itemsTotal ?? 0}
                loadMoreProducts={fetchNextPage}
                handleSelectItem={handleSelectItem}
                
                isLoadingData={items.length <= 0 && isLoading}
                isFetchingNextPage={isFetchingNextPage}
                isLoadingUseQuery={isLoading}
            />
        </>
    );
}

export default function Cobranza(): JSX.Element {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <AbonosContent />
        </Suspense>
    );
}
