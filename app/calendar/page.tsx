"use client";

import React, { useState } from 'react';
import MyCalendar from './Calendar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useRouter } from 'next/navigation';
import FormMeeting, { INITIAL_MEETING } from '../bitacora/FormMeeting';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { meetingExample } from '@/seed/bitacoraData';

export default function Calendar() {

    const { push } = useRouter()
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
    const [eventToOpen, setEventToOpen] = useState(INITIAL_MEETING)

    const handelOnClickEvent = (info: EventClickArg) => {
        const dataEvent = info.event.extendedProps
        console.log({dataEvent})

        if(dataEvent.TableType === "Bitacora"){
            setEventToOpen(meetingExample);
            setOpenModalCreateMeeting(true);
            return;
        }

        if(dataEvent.TableType === "Ventas"){
            alert("Ventas")
            return;
        }

    };

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
                onClickDay={() => push(`calendar/event/1`)}
            />

            <FormMeeting
                visible={openModalCreateMeeting}
                onClose={handleCloseMeetingModal}
                meetingProp={eventToOpen}
            />

        </div>
    )
}
