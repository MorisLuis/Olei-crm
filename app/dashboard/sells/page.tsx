'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { SellsFilterSchema } from '@/schemas/sellsFilters.schema';
import { getSells } from '@/services/sells/sells.service';
import TableSells from './TableSells';
import { sellsFiltersConfig } from './filters';
import styles from '../../../styles/pages/Sells.module.scss';

function SellsContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsInterface[]>([]);
  const { filters, updateFilter,  updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
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
  if (isLoading && items.length === 0) return <div>cargando...</div>;

  return (
    <div className={styles.page}>
      <Header title="Ventas" dontShowBack />
      <FilterBar
        filters={filters}
        config={sellsFiltersConfig}
        updateFilter={updateFilter as unknown as (key: 'SellsOrderCondition' | 'termSearch', value: string | number) => void}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />
      <TableSells
        sells={items}
        totalSells={0}
        loadMoreProducts={() => setPage(p => p + 1)}
        //handleSelectItem={handleSelectItem}
        buttonIsLoading={false}
        loadingData={isLoading}
      />
    </div>
  );
}


export default function Sells(): JSX.Element {
  return (
      <Suspense fallback={<p>Cargando...</p>}>
          <SellsContent />
      </Suspense>
  );
}
