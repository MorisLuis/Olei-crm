
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaInterface, CobranzaFilters, TotalCobranzaResponse } from '@/services/cobranza/cobranza.interface';
import { getCobranza, getCobranzaCountAndTotal, } from '@/services/cobranza/cobranza.service';
import { cobranzaFiltersConfig } from './cobranzaFilters';
import cobranzaStats from './cobranzaStats';
import TableCobranza from './cobranzaTable';

function CobranzaContent(): JSX.Element {

    const router = useRouter()
    const [cobranzaTotal, setCobranzaTotal] = useState<TotalCobranzaResponse | null>(null);
    const [cobranzaCount, setCobranzaCount] = useState<number>()
    const [isLoadingTotals, setIsLoadingTotals] = useState(true)
    const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaFilterSchema)

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ cobranza: CobranzaInterface[] }, Error>({
        queryKey: ['cobranza', filters],
        queryFn: ({ pageParam = 1 }) => getCobranza({ PageNumber: pageParam as number, filters }),
        getNextPageParam: (lastPage, allPages) => lastPage.cobranza.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5
    });
    const items = data?.pages.flatMap(page => page.cobranza) ?? [];

    const handleSelectItem = (item: CobranzaInterface): void => {
        const params = new URLSearchParams({
            Id_Almacen: item.Id_Almacen.toString(),
            client: item.Nombre.trim(),
            email: item.CorreoVtas.trim() ?? '',
        });
        router.push(`/dashboard/cobranza/${item.Id_Cliente}?${params.toString()}`);
    };

    const handleGetTotals = useCallback(async (): Promise<void> => {
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
    }, [handleGetTotals, filters])

    if (error) return <Custum500 handleRetry={refetch} />;

    return (
        <>
            <Header title="Cuentas por cobrar" dontShowBack />
            <HeaderStats
                items={cobranzaStats(cobranzaTotal)}
                isLoading={isLoadingTotals}
                sizeSkeleton={3}
            />

            <FilterBar
                filters={filters}
                config={cobranzaFiltersConfig}
                updateFilter={updateFilter}
                updateFilters={updateFilters}
                removeFilter={removeFilter}
                removeFilters={removeFilters}
                isLoading={isLoading}
            />

            <TableCobranza
                sells={items}
                totalSells={cobranzaCount ?? 0}
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
            <CobranzaContent />
        </Suspense>
    );
}
