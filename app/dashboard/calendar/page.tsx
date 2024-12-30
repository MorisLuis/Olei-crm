"use client";

import React, { Suspense, useState } from 'react';
import MyCalendar from './Calendar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useRouter, useSearchParams } from 'next/navigation';
import FormMeeting, { INITIAL_MEETING } from '../bitacora/FormMeeting';
import { EventClickArg } from '@fullcalendar/core/index.js';
import Modal from '@/components/Modals/Modal';
import SellDetails from '../sells/[id]/[sellId]/SellDetails';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { getMeetingById } from '@/services/meeting';
import MeetingInterface from '@/interface/meeting';

function CalendarContent() {

    const { push, back } = useRouter();
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
    const [eventToOpen, setEventToOpen] = useState<MeetingInterface>(INITIAL_MEETING);
    const searchParams = useSearchParams();
    const Sellid = searchParams.get('sellId');

    const handelOnClickEvent = async (info: EventClickArg) => {
        const dataEvent = info.event.extendedProps;

        if (dataEvent.TableType === "Bitacora") {
            // Get meeting from API
            const meeting = await getMeetingById(dataEvent.Id);
            setEventToOpen(meeting);
            setOpenModalCreateMeeting(true);
            return;
        }

        if (dataEvent.TableType === "Ventas") {
            // Get sell and folio from API.
            // Doesnt exist sellId we have to use composed key from 'Ventas' Table ( UniqueKey )
            push(`calendar/?sellId=${dataEvent.Id}&Id_Cliente=${dataEvent.Id_Cliente}`)
            return;
        }

    };

    const handleOnClickDay = (arg: DateClickArg) => {
        push(`calendar/event/${arg.date}`)
    }

    const handleCloseMeetingModal = () => {
        setOpenModalCreateMeeting(false);
        setEventToOpen(INITIAL_MEETING)
    }

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ]

    return (
        <div>
            <Header title='Calendario' actions={clientActions} />

            <MyCalendar
                onClickEvent={handelOnClickEvent}
                onClickDay={handleOnClickDay}
            />

            <FormMeeting
                visible={openModalCreateMeeting}
                onClose={handleCloseMeetingModal}
                meetingProp={eventToOpen}
                isEditing
            />

            <Modal
                visible={Sellid ? true : false}
                title='Detalle de venta'
                onClose={() => back()}
                modalSize='medium'
            >
                <SellDetails />
            </Modal>

        </div>
    )
}


export default function Calendar() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <CalendarContent />
        </Suspense>
    );
}
