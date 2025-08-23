'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { Suspense, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import MeetingInterface from '@/interface/meeting';
import { BitacoraFilterSchema } from '@/schemas/bitacoraFilters.schema';
import { getMeetings } from '@/services/bitacora/meeting.service';
import FormMeeting from './FormMeeting';
import TableBitacora from './TableBitacora';
import { bitacoraFiltersConfig } from './bitacoraFilters';
import styles from '../../../styles/pages/Sells.module.scss';

function BitacoraContent(): JSX.Element {

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(BitacoraFilterSchema);

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<{ meetings: MeetingInterface[], total: number }, Error>({
    queryKey: ['clients', filters],
    queryFn: ({ pageParam = 1 }) => getMeetings({ PageNumber: pageParam as number, filters }),
    getNextPageParam: (lastPage, allPages) => lastPage.meetings.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5
  });

  const items = data?.pages.flatMap(page => page.meetings) ?? [];
  const count = data?.pages.flatMap(page => page.total)[0] ?? 0;

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
      notVsible: isLoading
    }
  ]

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <div className={styles.page}>
      <Header
        title="Bitacora"
        actions={clientActions}
        dontShowBack
      />

      <FilterBar
        filters={filters}
        config={bitacoraFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
        isLoading={isLoading}
      />

      <TableBitacora
        meetings={items}
        totalMeetings={count ?? 0}
        loadMoreProducts={fetchNextPage}

        isLoadingData={items.length <= 0 && isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isLoadingUseQuery={isLoading}
        refetch={refetch}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={() => setOpenModalCreateMeeting(false)}
        newPost={refetch}
      />
    </div>
  );
}

export default function Bitacora(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <BitacoraContent />
    </Suspense>
  );
}