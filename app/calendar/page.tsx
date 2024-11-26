"use client";

import React, { useState } from 'react';
import MyCalendar from './Calendar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useRouter } from 'next/navigation';
import FormMeeting from '../bitacora/FormMeeting';

export default function Calendar() {

    const { push } = useRouter()
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false)

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
                onClickEvent={() => push(`calendar/event/1`)}
                onClickDay={() => console.log(true)}
            />

            <FormMeeting
                visible={openModalCreateMeeting}
                onClose={() => setOpenModalCreateMeeting(false)}
            />

        </div>
    )
}
