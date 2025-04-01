'use client';

import { EventClickArg } from '@fullcalendar/core/index.js';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import MeetingInterface from '@/interface/meeting';
import { getMeetingById } from '@/services/meeting';
import MyCalendar from './Calendar';
import FormMeeting, { INITIAL_MEETING } from '../bitacora/FormMeeting';
import SellDetails from '../sells/[id]/[sellId]/SellDetails';

function CalendarContent() : JSX.Element {
  const { push, back } = useRouter();
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [eventToOpen, setEventToOpen] = useState<MeetingInterface>(INITIAL_MEETING);
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');

  const handelOnClickEvent = async (info: EventClickArg) : Promise<void | null> => {
    const dataEvent = info.event.extendedProps;

    if (dataEvent.TableType === 'Bitacora') {
      // Get meeting from API
      const { meeting } = await getMeetingById(dataEvent.Id);
      if(!meeting) return null;
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

  const handleOnClickDay = (arg: DateClickArg) : void=> {
    push(`calendar/event/${arg.date}`);
  };

  const handleCloseMeetingModal = () : void => {
    setOpenModalCreateMeeting(false);
    setEventToOpen(INITIAL_MEETING);
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Reunión',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
    },
  ];

  return (
    <div>
      <Header title="Calendario" actions={clientActions} dontShowBack />

      <MyCalendar onClickEvent={handelOnClickEvent} onClickDay={handleOnClickDay} />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        meetingProp={eventToOpen}
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
    </div>
  );
}

export default function Calendar() : JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CalendarContent />
    </Suspense>
  );
}
