'use client';

import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import TableTertiaryBitacoraDetails from '@/app/dashboard/bitacora/[id]/TableTertiaryBitacoraDetails';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useWindowSize } from '@/hooks/useWindowSize';
import MeetingInterface from '@/interface/meeting';
import ModalSells from './ModalSells';
import { RenderEventSelects } from './RenderEventSelects';
import MyTimeline from './Timeline';
import TimelineEventsValidation from './TimelineEventsValidation';
import { ExecuteNavigationEventClient } from './navigation';
import { useEventsOfTheDay } from './useEventsOfTheDay';
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

  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const decodedDate = decodeURIComponent(lastSegment!);

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [openModalEvent, setOpenModalEvent] = useState(false);
  const [eventSelected, setEventSelected] = useState<number>(0);
  const [refreshTimeline, setRefreshTimeline] = useState(false)
  const eventsOfTheDay = useEventsOfTheDay(decodedDate, refreshTimeline);
  const { events, sellEvents } = TimelineEventsValidation({ eventsOfTheDay: eventsOfTheDay ?? [] });

  const handleMeetingCreated = (): void => {
    setRefreshTimeline(prev => !prev);
  };

  // Abrir modal solo en móviles
  const handleSelectEventFromTimeline = (Id: MeetingInterface): void => {
    if (isMobile) setOpenModalEvent(true);
    setEventSelected(Id.Id_Bitacora);
  };

  const handleCloseMeetingModal = (): void => setOpenModalCreateMeeting(false);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Reunión',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
    },
  ];

  useEffect(() => {
    if (events.length > 0) {
      setEventSelected(Number(events[0].id));
    }
  }, [events, refreshTimeline]);

  if (!events || !sellEvents) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={styles.event}>
      <Header title="Calendario" actions={clientActions} custumBack={navigateToBack} />

      <div className={styles.content}>
        <div className={styles.timeline}>
          {sellEvents.length > 0 && (
            <MessageSecondaryCard
              title={'Hay docuentos que expiran hoy.'}
              icon={faFileExcel}
              action={{
                onClick: () => navigateToModalSells(),
                color: 'blue',
                text: 'Ver documentos',
              }}
            />
          )}

          <MyTimeline
            onClickEvent={handleSelectEventFromTimeline}
            initialDateProp={decodedDate}
            eventsOfTheDay={events}
          />
        </div>

        {RenderEventSelects({ events, eventsOfTheDay, eventSelected })}
      </div>

      <Modal
        visible={openModalEvent}
        onClose={() => setOpenModalEvent(false)}
        title="Tarea"
        modalSize="medium"
      >
        <div className={styles.brief}>
          <h4>Reunión</h4>
          <TableTertiaryBitacoraDetails Id_Bitacora={eventSelected} />
        </div>
      </Modal>

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        handleMeetingCreated={handleMeetingCreated}
      />

      <ModalSells
        visible={openModalSells}
        onClose={navigateBackFromModalSells}
        onCloseModalSecondary={navigateCloseModalSecondary}
        sellEvents={sellEvents}
      />
    </div>
  );
}
