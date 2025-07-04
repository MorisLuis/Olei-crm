'use client';

import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import MeetingInterface from '@/interface/meeting';
import CalendarComponent from './Calendar';
import FormMeeting from '../bitacora/FormMeeting';
import { INITIAL_MEETING } from '../bitacora/FormMeetingData';
import SellDetails from '../sells/general/[id]/[sellId]/SellDetails';

function CalendarContent(): JSX.Element {
  const { push, back } = useRouter();
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [eventToOpen, setEventToOpen] = useState<MeetingInterface>(INITIAL_MEETING);
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const [refreshCalendar, setRefreshCalendar] = useState(false)

  const handleOnClickDay = (arg: DateClickArg): void => {
    push(`calendar/event/${arg.date}`);
  };

  const handleCloseMeetingModal = (): void => {
    setOpenModalCreateMeeting(false);
    setEventToOpen(INITIAL_MEETING);
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
    },
  ];

  const handleMeetingUpdated = (): void => {
    setRefreshCalendar(prev => !prev);
  };

  return (
    <>
      <Header title="Calendario" actions={clientActions} dontShowBack />

      <CalendarComponent
        onClickDay={handleOnClickDay}
        refreshCalendar={refreshCalendar}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        meetingProp={eventToOpen}
        onMeetingUpdated={handleMeetingUpdated}
        isEditing
      />

      <Modal
        visible={Sellid ? true : false}
        title="Detalle de venta"
        onClose={() => back()}
        modalSize="medium"
      >
        <SellDetails />
      </Modal>
    </>
  );
}

export default function Calendar(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CalendarContent />
    </Suspense>
  );
}


/* 
  const handelOnClickEvent = async (info: EventClickArg): Promise<void | null> => {
    const dataEvent = info.event.extendedProps;

    if (dataEvent.TableType === 'Bitacora') {
      // Get meeting from API
      const { meeting } = await getMeetingById(dataEvent.Id);
      if (!meeting) return null;
      setEventToOpen(meeting);
      setOpenModalCreateMeeting(true);
      return null;
    }

    if (dataEvent.TableType === 'Ventas') {
      // Get sell and folio from API.
      // Doesnt exist sellId we have to use composed key from 'Ventas' Table ( UniqueKey )
      push(`calendar/?sellId=${dataEvent.Id}&Id_Cliente=${dataEvent.Id_Cliente}`);
      return null;
    }
  };
*/