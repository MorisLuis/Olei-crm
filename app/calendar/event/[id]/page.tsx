"use client";

import React, { useState, useEffect } from 'react';
import MyTimeline from '../../Timeline';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/bitacora/[id]/TableTertiaryBitacoraDetails';
import Modal from '@/components/Modals/Modal';
import styles from "../../../../styles/pages/Calendar.module.scss";
import MeetingInterface from '@/interface/meeting';
import FormMeeting from '@/app/bitacora/FormMeeting';
import { usePathname } from 'next/navigation';
import { meetingsExamples } from '@/seed/bitacoraData';
import { MessageCard } from '@/components/Cards/MessageCard';
import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';

export default function EventDetails() {

    const pathname = usePathname();
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1); // Extract last part that is the date.
    const decodedDate = decodeURIComponent(lastSegment!);

    // We will get event by day - API
    const eventsOfTheDay = meetingsExamples;

    const [openModalEvent, setOpenModalEvent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [eventSelected, setEventSelected] = useState<number>(eventsOfTheDay[0]?.Id_Bitacora)
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);


    // Abrir modal solo en móviles
    const handleEventClick = (Id: MeetingInterface) => {
        if (isMobile) setOpenModalEvent(true);
        setEventSelected(Id.Id_Bitacora ?? 1)
    };

    const handleCloseMeetingModal = () => {
        setOpenModalCreateMeeting(false);
    }

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ]

    // Detectar si es móvil
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 912); // Umbral para considerar "móvil"
        };
        handleResize(); // Verificar en el primer render
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.event}>
            <Header title='Calendario' actions={clientActions} />

            <div className={styles.content}>
                <div className={styles.timeline}>
                    <MyTimeline
                        onClickEvent={handleEventClick}
                        initialDateProp={decodedDate}
                        eventsOfTheDay={eventsOfTheDay}
                    />
                </div>
                {
                    eventsOfTheDay.length > 0 ?
                        <div className={styles.brief}>
                            <p className={styles.brief__instruction}>Selecciona la tarea para ver el detalle de la tarea.</p>
                            <h4>Reunión</h4>
                            <TableTertiaryBitacoraDetails Id_Bitacora={eventSelected} />
                        </div>
                        :
                        <div>
                            <MessageCard
                                title='No hay eventos hoy'
                                icon={faCalendarXmark}
                            >
                                <p>No tienes algun evento para hoy, puedes crear un evento para el dia de hoy y se agendara.</p>
                            </MessageCard>
                        </div>
                }
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
        </div>
    );
}
