'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import BitacoraDetailsTable from '@/app/dashboard/bitacora/[id]/BitacoraDetails';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useWindowSize } from '@/hooks/useWindowSize';
import MeetingInterface from '@/interface/meeting';
import Timeline from './Timeline';
import TimelineEventsValidation from './TimelineEventsValidationTemp';
import TimelineModalSells from './TimelineModalSells';
import { ExecuteNavigationEventClient } from './TimelineNavigationTemp';
import { useGetEventsOfTheDay } from './useEventsOfTheDay';
import styles from '../../../../../styles/pages/Calendar.module.scss';

export default function EventDetails(): JSX.Element {

  const pathname = usePathname();
  const { isMobile } = useWindowSize();

  const {
    navigateToBack,
    navigateBackFromModalSells,
    navigateToModalSells,
    openModalSells,
    navigateCloseModalSecondary,
  } = ExecuteNavigationEventClient();

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [eventSelected, setEventSelected] = useState<number>(0);
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
  const eventsOfTheDay = useGetEventsOfTheDay(decodedDate, idCliente, refreshTimeline);
  const { events, sellEvents } = TimelineEventsValidation({ eventsOfTheDay: eventsOfTheDay ?? [] });

  const onMeetingCreated = (): void => setRefreshTimeline(prev => !prev);
  const onCloseMeetingModal = (): void => setOpenModalCreateMeeting(false);
  const onSelectEventFromTimeline = (Id: MeetingInterface): void => {
    if (isMobile) setOpenModalEvent(true);
    setEventSelected(Id.Id_Bitacora);
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
    },
  ];

  useEffect(() => {
    if (events.length > 0) {
      setEventSelected(Number(events[0].id));
    }
  }, [events, refreshTimeline]);

  return (
    <div className={styles.timeline}>
      <Header
        title={clientName ? clientName : "Calendario"}
        actions={clientActions}
        custumBack={navigateToBack}
      />

      <Timeline
        onClickEvent={onSelectEventFromTimeline}
        initialDateProp={decodedDate}
        eventsOfTheDay={eventsOfTheDay}
        events={events}
        sellEvents={sellEvents}
        eventSelected={eventSelected}
        navigateToModalSells={navigateToModalSells}
      />

      <Modal
        visible={openModalEvent}
        onClose={() => setOpenModalEvent(false)}
        title="Tarea"
        modalSize="medium"
      >
        <div className={styles.brief}>
          <h4>Actividad</h4>
          <BitacoraDetailsTable Id_Bitacora={eventSelected} />
        </div>
      </Modal>

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={onCloseMeetingModal}
        handleMeetingCreated={onMeetingCreated}
        clientData={clientData}
      />

      <TimelineModalSells
        visible={openModalSells}
        onClose={navigateBackFromModalSells}
        onCloseModalSecondary={navigateCloseModalSecondary}
        sellEvents={sellEvents}
      />
    </div>
  );
}
