'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { SellsFilterSchema } from '@/schemas/sellsFilters.schema';
import { totalSellsResponse } from '@/services/sells/sells.interface';
import { getSells } from '@/services/sells/sells.service';
import { sellsFiltersConfig } from './sellsFilters';
import sellsStats from './sellsStats';
import TableSells from './sellsTable';

function SellsContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsInterface[]>([]);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsInterface[], count: number, totalStats: totalSellsResponse }, { PageNumber: number; filters: typeof filters }>(
      ['sells', page],
      ({ PageNumber, filters }) => getSells({ PageNumber, filters }),
      { PageNumber: page, filters }
    );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [filters]);

  useEffect(() => {
    if (data?.sells) {
      setItems(prev => [...prev, ...data.sells]);
    }
  }, [data]);

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <Header title="Ventas" dontShowBack />
      <HeaderStats items={sellsStats(data?.totalStats)} isLoading={isLoading} />
      <FilterBar
        filters={filters}
        config={sellsFiltersConfig}
        updateFilter={updateFilter as unknown as (key: 'sellsOrderCondition' | 'searchTerm', value: string | number) => void}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />
      <TableSells
        sells={items}
        totalSells={data?.count ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        buttonIsLoading={false}
        loadingData={items.length <= 0 && isLoading}
      />
    </>
  );
}


export default function Sells(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <SellsContent />
    </Suspense>
  );
}
