'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import Custum500 from '@/components/500';
import InputSearchDynamic from '@/components/Inputs/inputSearchDynamic';
import Header from '@/components/navigation/header';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { ClientInterface } from '@/interface/client';
import { ClientsFilterSchema } from '@/schemas/clientsFilters.schema';
import { getClients } from '@/services/clients/clients.service';
import TableClients from './TableClients';
import styles from '../../../styles/pages/Clients.module.scss';

function ClientsContent(): JSX.Element {

  const { filters, updateFilter, removeFilters } = useUrlFilters(ClientsFilterSchema);

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<{ clients: ClientInterface[], total: number }, Error>({
    queryKey: ['clients', filters],
    queryFn: ({ pageParam = 1 }) => getClients({ PageNumber: pageParam as number, filters }),
    getNextPageParam: (lastPage, allPages) => lastPage.clients.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5 // Five minutes
  });

  const items = data?.pages.flatMap(page => page.clients) ?? [];
  const count = data?.pages.flatMap(page => page.total)[0] ?? 0;

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <div className={styles.page}>
      <Header title="Clientes" dontShowBack />

      <InputSearchDynamic
        updateFilter={updateFilter}
        removeFilters={removeFilters}
        filters={filters}
        labelsMap={{
          Id_Cliente: "Cliente",
          Nombre: "Nombre"
        }}
      />

      <TableClients
        clients={items}
        totalClients={count ?? 0}
        loadMoreProducts={fetchNextPage}

        isLoadingData={items.length <= 0 && isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isLoadingUseQuery={isLoading}
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
