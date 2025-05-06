'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { SellsFilterSchema } from '@/schemas/sellsFilters.schema';
import { TotalSellsResponse } from '@/services/sells/sells.interface';
import { getSells } from '@/services/sells/sells.service';
import { sellsFiltersConfig } from './sellsFilters';
import sellsStats from './sellsStats';
import TableSells from './sellsTable';

function SellsContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsInterface[]>([]);
  const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
  const [sellsCount, setSellsCount] = useState<number>()
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsInterface[], count: number, total: TotalSellsResponse }, { PageNumber: number; filters: typeof filters }>(
      ['sells', page],
      ({ PageNumber, filters }) => getSells({ PageNumber, filters }),
      { PageNumber: page, filters }
    );

  const handleGetTotals = useCallback(async (): Promise<void> => {
    /* const { total, count } = await getCobranzaCountAndTotal({
      filters: filters as SellsFilters
    })

    setSellsTotal(total);
    setSellsCount(count) */
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

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <Header title="Ventas" dontShowBack />
      <HeaderStats items={sellsStats(data?.total)} isLoading={isLoading} />
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
