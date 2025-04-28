
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaInterface } from '@/services/cobranza/cobranza.interface';
import { getCobranza } from '@/services/cobranza/cobranza.service';
import TableCobranza from './TableCobranzaByClient';
import { cobranzaFiltersConfig } from './filters';

function CobranzaContent(): JSX.Element {

    const router = useRouter()
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<CobranzaInterface[]>([]);
    const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaFilterSchema)

    const { data, error, isLoading, refetch } =
        useQueryPaginationWithFilters<{ cobranza: CobranzaInterface[] }, { PageNumber: number; filters: typeof filters }>(
            ['cobranza', page],
            ({ PageNumber, filters }) => getCobranza({ PageNumber, filters }),
            { PageNumber: page, filters }
        );

    const handleSelectItem = (item: CobranzaInterface): void => {
        router.push(`/dashboard/cobranza/${item.Id_Cliente}?Id_Almacen=${item.Id_Almacen}`)
    }

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
    if (isLoading && items.length === 0) return <div>cargando...</div>;

    return (
        <div>
            <Header title="Cobranza" dontShowBack />

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
                totalSells={0}
                loadMoreProducts={() => setPage(p => p + 1)}
                handleSelectItem={handleSelectItem}
                buttonIsLoading={false}
                loadingData={isLoading}
            />
        </div>
    );
}

export default function Cobranza(): JSX.Element {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <CobranzaContent />
        </Suspense>
    );
}
