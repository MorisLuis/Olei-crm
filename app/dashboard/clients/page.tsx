'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { ClientInterface } from '@/interface/client';
import { ClientsFilterSchema } from '@/schemas/clientsFilters.schema';
import { getClients } from '@/services/clients/clients.service';
import TableClients from './TableClients';
import { clientsFiltersConfig } from './filters';
import styles from '../../../styles/pages/Clients.module.scss';

function ClientsContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ClientInterface[]>([]);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(ClientsFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ clients: ClientInterface[], total: number }, { PageNumber: number; filters: typeof filters }>(
      ['cobranza', page],
      ({ PageNumber, filters }) => getClients({ PageNumber, filters }),
      { PageNumber: page, filters }
    );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [filters]);

  useEffect(() => {
    if (data?.clients) {
      setItems(prev => [...prev, ...data.clients]);
    }
  }, [data]);

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <div className={styles.page}>
      <Header title="Clientes" dontShowBack />

      <FilterBar
        filters={filters}
        config={clientsFiltersConfig}
        updateFilter={updateFilter as unknown as (key: 'clientOrderCondition' | 'searchTerm', value: string | number) => void}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />

      <TableClients
        clients={items}
        totalClients={data?.total ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        buttonIsLoading={false}
        loadingData={items.length <= 0 && isLoading}
      />
    </div>
  );
}

export default function Clietns(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ClientsContent />
    </Suspense>
  );
}
