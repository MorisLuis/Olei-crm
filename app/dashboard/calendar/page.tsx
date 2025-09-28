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

interface CalendarContentInterface {
  isLoading?: boolean
}

function CalendarContent({
  isLoading = false
}: CalendarContentInterface): JSX.Element {
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
      <Header
        title="Calendario"
        actions={clientActions}
        dontShowBack
      />

      <CalendarComponent
        onClickDay={handleOnClickDay}
        refreshCalendar={refreshCalendar}
        isLoading={isLoading}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        meetingProp={eventToOpen}
        onMeetingUpdated={handleMeetingUpdated}
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

export default function CalendarScreen(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <CalendarContent />
    </Suspense>
  );
}
