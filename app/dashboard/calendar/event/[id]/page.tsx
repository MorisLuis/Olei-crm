"use client";

import React, { useEffect, useState } from 'react';
import MyTimeline from './Timeline';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/dashboard/bitacora/[id]/TableTertiaryBitacoraDetails';
import Modal from '@/components/Modals/Modal';
import MeetingInterface from '@/interface/meeting';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import { usePathname } from 'next/navigation';
import { MessageCard } from '@/components/Cards/MessageCard';
import { faCalendarXmark, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from '@/hooks/useWindowSize';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import styles from "../../../../../styles/pages/Calendar.module.scss";
import ModalSells from './ModalSells';
import { getCalendarTaskByDay } from '@/services/calendar';
import { TimelineInterface } from '@/interface/calendar';
import TimelineEventsValidation from './TimelineEventsValidation';

export default function EventDetails() {

    const pathname = usePathname();
    const { isMobile } = useWindowSize();
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1); // Extract last part that is the date.
    const decodedDate = decodeURIComponent(lastSegment!);
    const [openModalSells, setOpenModalSells] = useState(false);
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
    const [openModalEvent, setOpenModalEvent] = useState(false);

    const [eventSelected, setEventSelected] = useState<number>(0);
    const [eventsOfTheDay, setEventsOfTheDay] = useState<TimelineInterface[] | null>(null);
    const { events, sellEvents } = TimelineEventsValidation({ eventsOfTheDay: eventsOfTheDay ?? [] });

    // Abrir modal solo en móviles
    const handleSelectEvent = (Id: MeetingInterface) => {
        if (isMobile) setOpenModalEvent(true);
        setEventSelected(Id.Id_Bitacora)
    };

    const handleGetEventsOfTheDay = async () => {
        const events = await getCalendarTaskByDay('02-14-2024');
        setEventsOfTheDay(events);
    }

    const handleCloseMeetingModal = () => setOpenModalCreateMeeting(false);

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ];

    const renderEventSelects = () => {

        if (!eventsOfTheDay) {
            return (
                <div>
                    <p>Cargando...</p>
                </div>
            )
        };

        if (events.length > 0) {
            return (
                <div className={styles.brief}>
                    <p className={styles.brief__instruction}>Selecciona la tarea para ver el detalle de la tarea.</p>
                    <h4>Reunión</h4>
                    <TableTertiaryBitacoraDetails Id_Bitacora={eventSelected} />
                </div>
            )
        }

        return (
            <div>
                <MessageCard
                    title='No hay eventos hoy'
                    icon={faCalendarXmark}
                >
                    <p>No tienes algun evento para hoy, puedes crear un evento para el dia de hoy y se agendara.</p>
                </MessageCard>
            </div>
        )

    }

    useEffect(() => {
        handleGetEventsOfTheDay()
    }, [])

    useEffect(() => {
        if (events.length < 1) return;
        setEventSelected(Number(events[0].id) ?? 0)
    }, [events]);

    if (!events || !sellEvents) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div className={styles.event}>
            <Header title='Calendario' actions={clientActions} />

            <div className={styles.content}>
                <div className={styles.timeline}>
                    {
                        sellEvents.length > 0 &&
                        <MessageSecondaryCard
                            title={"Hay docuentos que expiran hoy."}
                            icon={faFileExcel}
                            action={{
                                onClick: () => setOpenModalSells(true),
                                color: 'blue',
                                text: "Ver documentos"
                            }}
                        />
                    }
                    <MyTimeline
                        onClickEvent={handleSelectEvent}
                        initialDateProp={decodedDate}
                        eventsOfTheDay={events}
                    />
                </div>
                {renderEventSelects()}
            </div>

            <Modal
                visible={openModalEvent}
                onClose={() => setOpenModalEvent(false)}
                title='Tarea'
                modalSize='medium'
            >
                <div className={styles.brief}>
                    <h4>Reunión</h4>
                    <TableTertiaryBitacoraDetails Id_Bitacora={eventSelected} />
                </div>
            </Modal>

            <FormMeeting
                visible={openModalCreateMeeting}
                onClose={handleCloseMeetingModal}
            />

            <ModalSells
                visible={openModalSells}
                onClose={() => setOpenModalSells(false)}
                sellEvents={sellEvents}
            />
        </div>
    );
}
