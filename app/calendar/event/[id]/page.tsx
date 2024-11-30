"use client";

import React, { useState } from 'react';
import MyTimeline from '../../Timeline';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/bitacora/[id]/TableTertiaryBitacoraDetails';
import Modal from '@/components/Modals/Modal';
import MeetingInterface from '@/interface/meeting';
import FormMeeting from '@/app/bitacora/FormMeeting';
import { usePathname } from 'next/navigation';
import { MessageCard } from '@/components/Cards/MessageCard';
import { faCalendarXmark, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from '@/hooks/useWindowSize';
import { calendarTimelineExamples } from '@/seed/calendarData';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import styles from "../../../../styles/pages/Calendar.module.scss";

export default function EventDetails() {

    const pathname = usePathname();
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1); // Extract last part that is the date.
    const decodedDate = decodeURIComponent(lastSegment!);

    // We will get event by day - API
    const eventsOfTheDay = calendarTimelineExamples;
    const sellEvents = eventsOfTheDay.map((item) => item.TableType === "Ventas");

    const [openModalEvent, setOpenModalEvent] = useState(false);
    const { isMobile } = useWindowSize()
    const [eventSelected, setEventSelected] = useState<number>(eventsOfTheDay[0]?.Id_Bitacora ?? 0);
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
                                onClick: () => console.log(),
                                color: 'blue',
                                text: "Ver documentos"
                            }}
                        />
                    }
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
