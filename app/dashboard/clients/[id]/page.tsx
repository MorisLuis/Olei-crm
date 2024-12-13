"use client";

import BriefCard from '@/components/Cards/BriefCard'
import { clientDetailsExample } from '@/seed/clientsData';
import React, { useCallback, useState } from 'react'
import Header, { ActionsInterface } from '@/components/navigation/header';
import Modal from '@/components/Modals/Modal';
import WhatsAppModal from './ModalWhatsApp';
import EmailModal from './ModalEmail';
import { useRouter } from 'next/navigation';
import MyCalendar from '@/app/dashboard/calendar/Calendar';
import FormMeeting, { INITIAL_MEETING } from '@/app/dashboard/bitacora/FormMeeting';
import SellDetails from '@/app/dashboard/sells/[id]/[sellId]/SellDetails';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { meetingExample } from '@/seed/bitacoraData';
import { briefClientData } from './BriefClientData';
import styles from "../../../../styles/pages/Clients.module.scss";

export default function ClientDetailsPage() {

    const { push, back } = useRouter()
    const [openModalWhatsApp, setOpenModalWhatsApp] = useState(false);
    const [openModalEmail, setOpenModalEmail] = useState(false);
    const [eventToOpen, setEventToOpen] = useState(INITIAL_MEETING)
    const [openModalSell, setOpenModalSell] = useState(false)
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);


    const handleCloseMeetingModal = () => {
        setOpenModalCreateMeeting(false);
        setEventToOpen(INITIAL_MEETING)
    }

    const handleCloseModalSell = useCallback(() => {
        setOpenModalSell(false)
        back()
    }, [back])

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
            push(`?sellId=${dataEvent.Id}`)
            return;
        }

    };

    const handleOnClickDay = (arg: DateClickArg) => {
        push(`/dashboard/calendar/event/${arg.date}`)
    }

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Whatsapp',
            onclick: () => setOpenModalWhatsApp(true)
        },
        {
            id: 2,
            text: 'Correo',
            onclick: () => setOpenModalEmail(true)
        },
        {
            id: 3,
            text: 'Ventas',
            onclick: () => push(`/dashboard/sells/${clientDetailsExample.Id_Cliente}`)
        },
        {
            id: 4,
            text: 'Cobranza',
            onclick: () => push(`/dashboard/cobranza/${clientDetailsExample.Id_Cliente}`)
        }
    ]

    return (
        <>
            <Header title={`${clientDetailsExample.Nombre}`} actions={clientActions} />

            <div className={styles.clientDetails}>
                <div className={styles.clientDetails__calendar}>
                    <MyCalendar
                        onClickEvent={handelOnClickEvent}
                        onClickDay={handleOnClickDay}
                    />
                </div>
                <div className={styles.clientDetails__brief}>
                    <BriefCard data={briefClientData} header='Detalles de cliente' />
                </div>
            </div>

            <WhatsAppModal
                visible={openModalWhatsApp}
                onClose={() => setOpenModalWhatsApp(false)}
            />

            <EmailModal
                visible={openModalEmail}
                onClose={() => setOpenModalEmail(false)}
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

        </>
    )
}
