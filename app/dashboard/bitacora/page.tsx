'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import MeetingInterface from '@/interface/meeting';
import { BitacoraFilterSchema } from '@/schemas/bitacoraFilters.schema';
import { getMeetings } from '@/services/bitacora/meeting.service';
import { bitacoraFiltersConfig } from './FiltersTemp';
import FormMeeting from './FormMeeting';
import TableBitacora from './TableBitacora';
import styles from '../../../styles/pages/Sells.module.scss';

function BitacoraContent(): JSX.Element {

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<MeetingInterface[]>([]);
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(BitacoraFilterSchema);

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ meetings: MeetingInterface[], total: number }, { PageNumber: number; filters: typeof filters }>(
      ['bitacora', page],
      ({ PageNumber, filters }) => getMeetings({ PageNumber, filters }),
      { PageNumber: page, filters }
    );

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [filters]);

  useEffect(() => {
    if (data?.meetings) {
      setItems(prev => [...prev, ...data.meetings]);
    }
  }, [data]);


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
        totalMeetings={data?.total ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        buttonIsLoading={isLoading}
        loadingData={items.length <= 0 && isLoading}
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