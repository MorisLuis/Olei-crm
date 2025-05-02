
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaInterface, totalCobranzaResponse } from '@/services/cobranza/cobranza.interface';
import { getCobranza } from '@/services/cobranza/cobranza.service';
import { cobranzaFiltersConfig } from './cobranzaFilters';
import cobranzaStats from './cobranzaStats';
import TableCobranza from './cobranzaTable';

function CobranzaContent(): JSX.Element {

    const router = useRouter()
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<CobranzaInterface[]>([]);
    const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaFilterSchema)

    const { data, error, isLoading, refetch } =
        useQueryPaginationWithFilters<{ cobranza: CobranzaInterface[], count: number, totalStats: totalCobranzaResponse }, { PageNumber: number; filters: typeof filters }>(
            ['cobranza', page],
            ({ PageNumber, filters }) => getCobranza({ PageNumber, filters }),
            { PageNumber: page, filters }
        );

        const handleSelectItem = (item: CobranzaInterface): void => {
            const params = new URLSearchParams({
                Id_Almacen: item.Id_Almacen.toString(),
                client: item.Nombre.trim(),
                email: item.CorreoVtas.trim() ?? '',
            });
            router.push(`/dashboard/cobranza/${item.Id_Cliente}?${params.toString()}`);
        };
        

    useEffect(() => {
        setPage(1);
        setItems([]);
    }, [filters]);

    useEffect(() => {
        if (data?.cobranza) {
            setItems(prev => [...prev, ...data.cobranza]);
        }
    }, [data]);

    if (error) return <Custum500 handleRetry={refetch} />;

    return (
        <>
            <Header title="Cobranza"  dontShowBack />
            <HeaderStats items={cobranzaStats(data?.totalStats)} isLoading={isLoading} />

            <FilterBar
                filters={filters}
                config={cobranzaFiltersConfig}
                updateFilter={updateFilter as unknown as (key: 'cobranzaOrderCondition' | 'termSearch', value: string | number) => void}
                updateFilters={updateFilters}
                removeFilter={removeFilter}
                removeFilters={removeFilters}
            />

            <TableCobranza
                sells={items}
                totalSells={data?.count ?? 0}
                loadMoreProducts={() => setPage(p => p + 1)}
                handleSelectItem={handleSelectItem}
                buttonIsLoading={false}
                loadingData={items.length <= 0 && isLoading}
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
