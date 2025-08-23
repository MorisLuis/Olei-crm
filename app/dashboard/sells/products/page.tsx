'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import HeaderStats from '@/components/navigation/headerStats';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsProductsInterface } from '@/interface/sells';
import { TotalsSellsProductsReponse } from '@/services/sells/sells.interface';
import { SellsProductsFilters } from '@/services/sells/sellsProducts/sellsProducts.interface';
import { getSellsProducts, getSellsProductsCountAndTotal } from '@/services/sells/sellsProducts/sellsProducts.service';
import { sellsFiltersConfig } from './sellsProductsFilters';
import { SellsProductsFilterSchema } from './sellsProductsFilters.schema';
import sellsProductsStats from './sellsProductsStats';
import TableSells from './sellsProductsTable';

function SellsProductsContent(): JSX.Element {

  const [sellsTotal, setSellsTotal] = useState<TotalsSellsProductsReponse | null>(null);
  const [sellsCount, setSellsCount] = useState<number>()
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsProductsFilterSchema)
  const [isLoadingTotals, setIsLoadingTotals] = useState(true);

  const fetchTotals = useCallback(async (): Promise<void> => {
    setIsLoadingTotals(true)
    const { totals, count } = await getSellsProductsCountAndTotal({
      filters: filters as SellsProductsFilters
    })

    setSellsTotal(totals);
    setSellsCount(count)
    setIsLoadingTotals(false)
  }, [filters])

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<{ sells: SellsProductsInterface[] }, Error>({
    queryKey: ['sells', filters],
    queryFn: ({ pageParam = 1 }) => getSellsProducts({ PageNumber: pageParam as number, filters }),
    getNextPageParam: (lastPage, allPages) => lastPage.sells.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5 // Five minutes
  });
  const items = data?.pages.flatMap(page => page.sells) ?? [];

  useEffect(() => {
    fetchTotals()
  }, [fetchTotals])


  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <HeaderStats
        items={sellsProductsStats(sellsTotal)}
        isLoading={isLoadingTotals}
      />

      <FilterBar
        filters={filters}
        config={sellsFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
        isLoading={isLoading}
      />

      <TableSells
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={fetchNextPage}

        isLoadingData={items.length <= 0 && isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isLoadingUseQuery={isLoading}
      />
    </>
  );
}


export default function Sells(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <SellsProductsContent />
    </Suspense>
  );
}
