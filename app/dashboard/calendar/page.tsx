"use client";

import React, { useCallback, useState } from 'react';
import MyCalendar from './Calendar';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useRouter } from 'next/navigation';
import FormMeeting, { INITIAL_MEETING } from '../bitacora/FormMeeting';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { meetingExample } from '@/seed/bitacoraData';
import Modal from '@/components/Modals/Modal';
import SellDetails from '../sells/[id]/[sellId]/SellDetails';
import { DateClickArg } from '@fullcalendar/interaction/index.js';

export default function Calendar() {

    const { push, back } = useRouter()
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
    const [eventToOpen, setEventToOpen] = useState(INITIAL_MEETING)
    const [openModalSell, setOpenModalSell] = useState(false)

    const handelOnClickEvent = (info: EventClickArg) => {
        const dataEvent = info.event.extendedProps;

        if (dataEvent.TableType === "Bitacora") {
            // Get meeting from API
            setEventToOpen(meetingExample);
            setOpenModalCreateMeeting(true);
            return;
        }

        if (dataEvent.TableType === "Ventas") {
            // Get sell and folio from API.
            setOpenModalSell(true)
            // Doesnt exist sellId we have to use composed key from 'Ventas' Table ( UniqueKey )
            push(`calendar/?sellId=${dataEvent.Id}`)
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

    const handleCloseModalSell = useCallback(() => {
        setOpenModalSell(false)
        back()
    }, [back])

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
                visible={openModalSell}
                title='Detalle de venta'
                onClose={handleCloseModalSell}
                modalSize='medium'
            >
                <SellDetails />
            </Modal>

        </div>
    )
}
