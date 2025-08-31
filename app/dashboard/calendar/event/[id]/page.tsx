'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import Header, { ActionsInterface } from '@/components/navigation/header';
import ClientAgendaContent from './ClientAgendaContent';
import TimelineEventsValidation from './TimelineEventsValidationTemp';
import TimelineModalSells from './TimelineModalSells';
import { ExecuteNavigationEventClient } from './TimelineNavigationTemp';
import { useGetEventsOfTheDay } from './useEventsOfTheDay';
import styles from '../../../../../styles/pages/Calendar.module.scss';

export default function ClientAgenda(): JSX.Element {

  const pathname = usePathname();

  const {
    navigateToBack,
    navigateBackFromModalSells,
    navigateToModalSells,
    openModalSells
  } = ExecuteNavigationEventClient();

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [refreshTimeline, setRefreshTimeline] = useState(false)
  const searchParams = useSearchParams();
  const idCliente = searchParams.get('Id_Cliente');
  const idAlmacen = searchParams.get('Id_Almacen');
  const clientName = searchParams.get('clientName');

  const clientData = useMemo(() => {
    return (idCliente && idAlmacen && clientName) ? {
      Id_Cliente: Number(idCliente),
      Id_Almacen: Number(idAlmacen),
      name: clientName
    } : undefined
  }, [idCliente, idAlmacen, clientName])

  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const decodedDate = decodeURIComponent(lastSegment!);
  const { eventsOfTheDay, isLoading, TotalVentas, isFetchingNextPage, fetchNextPage } = useGetEventsOfTheDay(decodedDate, idCliente, refreshTimeline);
  const { events, sellEvents } = TimelineEventsValidation({ eventsOfTheDay: eventsOfTheDay ?? [] });

  const onMeetingCreated = (): void => setRefreshTimeline(prev => !prev);
  const onCloseMeetingModal = (): void => setOpenModalCreateMeeting(false);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
      notVsible: isLoading
    },
  ];

  return (
    <div className={styles.timelinePage}>
      <Header
        title={clientName ? clientName : "Calendario"}
        actions={clientActions}
        custumBack={navigateToBack}
      />      

      <ClientAgendaContent
        initialDateProp={decodedDate}
        events={events}
        sellEvents={sellEvents}
        refreshTimeline={refreshTimeline}
        isLoadingEvents={isLoading}
        navigateToModalSells={navigateToModalSells}
        TotalVentas={TotalVentas}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={onCloseMeetingModal}
        handleMeetingCreated={onMeetingCreated}
        clientData={{
          ...clientData,
          Fecha: new Date(decodedDate)
        }}
      />

      <TimelineModalSells
        visible={openModalSells}
        onClose={navigateBackFromModalSells}
        sellEvents={sellEvents}
        isLoadingUseQuery={isLoading}
        totalDocuments={TotalVentas}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreProducts={fetchNextPage}
      />
    </div>
  );
}
