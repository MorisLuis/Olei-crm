'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header, { ActionsInterface } from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/Filters/useFilters';
import { useFiltersMeetingConfig } from '@/hooks/Filters/useFiltersMeetingsConfig';
import { useOrderMeetingsConfig } from '@/hooks/Orders/useOrderMeetingsConfig';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import MeetingInterface from '@/interface/meeting';
import { getMeetings, getTotalMeetings } from '@/services/meeting';
import FormMeeting from './FormMeeting';
import TableBitacora from './TableBitacora';
import { ExecuteFiltersMeeting } from './filters';
import styles from '../../../styles/pages/Sells.module.scss';

export default function Bitacora(): JSX.Element {
  const { orderMeetings } = useOrderMeetingsConfig();
  const [orderActive, setOrderActive] = useState<OrderObject>(orderMeetings[0]);

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);

  const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
  const { filtersMeeting, filterOfMeetings } = useFiltersMeetingConfig();
  const filters = useMemo(() => ExecuteFiltersMeeting({ orderActive, filtersActive }),
    [orderActive, filtersActive]
  );
  const memoizedFilters = useMemo(() => filters, [filters]);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Reunión',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
    },
  ];

  const fetchInitialData = useCallback(async (): Promise<MeetingInterface[]> => {
    const { meetings } = await getMeetings({ PageNumber: 1, filters: memoizedFilters });
    return meetings;
  }, [memoizedFilters]);

  const fetchPaginatedData = useCallback(async (_: unknown, nextPage: number): Promise<MeetingInterface[]> => {
    const { meetings } = await getMeetings({ PageNumber: nextPage ?? 1, filters: memoizedFilters });
    return meetings;
  }, [memoizedFilters]);

  const fetchTotalCount = useCallback(async (): Promise<number> => {
    const { total } = await getTotalMeetings({ filters: memoizedFilters });
    return total;
  }, [memoizedFilters])

  const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
    fetchInitialData,
    fetchPaginatedData: (_, nextPage) => fetchPaginatedData(_, nextPage as number),
    fetchTotalCount,
    filters: memoizedFilters
  });

  const onSelectOrder = (value: string | number): void => {
    const orderActive = orderMeetings.find((item) => item.value == value);
    if (!orderActive) return;
    setOrderActive(orderActive);
  };

  useEffect(() => {
    handleResetData();
  }, [handleResetData]);

  /*   }, [orderActive, filtersActive, handleResetData]);
 */
  return (
    <div className={styles.page}>
      <Header title="Bitacora" actions={clientActions} dontShowBack />
      <HeaderTable
        filters={filtersMeeting}
        filtersOfSection={filterOfMeetings}
        filterActive={filtersTag}
        filtersActive={filtersActive}
        onSelectFilter={onSelectFilterValue}
        onDeleteFilter={onDeleteFilter}
        orderSells={orderMeetings}
        onSelectOrder={onSelectOrder}
        orderActive={orderActive}
      />

      <TableBitacora
        sells={data}
        totalSells={total ?? 0}
        loadMoreProducts={handleLoadMore}
        buttonIsLoading={isButtonLoading}
        loadingData={isLoading}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={() => setOpenModalCreateMeeting(false)}
        newPost={handleResetData}
      />
    </div>
  );
}
