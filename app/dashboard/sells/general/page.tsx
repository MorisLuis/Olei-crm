'use client';

import React, { Suspense } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import HeaderStats from '@/components/navigation/headerStats';
import { useSells } from '@/hooks/sells/useSells';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsFilterSchema } from '@/schemas/sellsFilters.schema';
import { sellsFiltersConfig } from './sellsFilters';
import sellsStats from './sellsStats';
import TableSells from './sellsTable';

function SellsContent(): JSX.Element {

  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsFilterSchema);
  const {  refetch, error, loadMore, isLoading, items, sellsTotal, sellsCount } = useSells(filters);

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <HeaderStats items={sellsStats(sellsTotal)} isLoading={isLoading} />
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
        totalSells={sellsCount ?? 0}
        loadMoreProducts={loadMore}
        isLoading={isLoading}
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
