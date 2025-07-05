'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsProductsInterface } from '@/interface/sells';
import { SellsProductsFilterSchema } from '@/schemas/sellsProductsFilters.schema';
import { TotalsSellsProductsReponse } from '@/services/sells/sells.interface';
import { SellsProductsFilters } from '@/services/sells/sellsProducts/sellsProducts.interface';
import { getSellsProducts, getSellsProductsCountAndTotal } from '@/services/sells/sellsProducts/sellsProducts.service';
import { sellsFiltersConfig } from './sellsProductsFilters';
import sellsProductsStats from './sellsProductsStats';
import TableSells from './sellsProductsTable';

function SellsProductsContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsProductsInterface[]>([]);
  const [sellsTotal, setSellsTotal] = useState<TotalsSellsProductsReponse | null>(null);
  const [sellsCount, setSellsCount] = useState<number>()
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsProductsFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsProductsInterface[] }, { PageNumber: number; filters: typeof filters }>(
      ['sells-products', page],
      ({ PageNumber, filters }) => getSellsProducts({ PageNumber, filters }),
      { PageNumber: page, filters }
    );

  const handleGetTotals = useCallback(async (): Promise<void> => {
    const { totals, count } = await getSellsProductsCountAndTotal({
      filters: filters as SellsProductsFilters
    })

    setSellsTotal(totals);
    setSellsCount(count)
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
      <HeaderStats items={sellsProductsStats(sellsTotal)} isLoading={isLoading} />
      <FilterBar
        filters={filters}
        config={sellsFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />
  
      <TableSells
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        buttonIsLoading={isLoading}
        loadingData={items.length <= 0 && isLoading}
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
