"use client";

import React, { useEffect, useState } from 'react';
import MyTimeline from './Timeline';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/dashboard/bitacora/[id]/TableTertiaryBitacoraDetails';
import Modal from '@/components/Modals/Modal';
import MeetingInterface from '@/interface/meeting';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useWindowSize } from '@/hooks/useWindowSize';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import styles from "../../../../../styles/pages/Calendar.module.scss";
import ModalSells from './ModalSells';
import TimelineEventsValidation from './TimelineEventsValidation';
import { useEventsOfTheDay } from './useEventsOfTheDay';
import { RenderEventSelects } from './RenderEventSelects';

export default function EventDetails() {

    const pathname = usePathname();
    const { isMobile } = useWindowSize();
    const { back } = useRouter()
    const searchParams = useSearchParams();
    const Sellid = searchParams.get('sellId');

    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const decodedDate = decodeURIComponent(lastSegment!);

    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
    const [openModalEvent, setOpenModalEvent] = useState(false);
    const [eventSelected, setEventSelected] = useState<number>(0);
    const eventsOfTheDay = useEventsOfTheDay(decodedDate);
    const { events, sellEvents } = TimelineEventsValidation({ eventsOfTheDay: eventsOfTheDay ?? [] });

    // Abrir modal solo en móviles
    const handleSelectEventFromTimeline = (Id: MeetingInterface) => {
        if (isMobile) setOpenModalEvent(true);
        setEventSelected(Id.Id_Bitacora)
    };

    const handleCloseMeetingModal = () => setOpenModalCreateMeeting(false);

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ];

    useEffect(() => {
        if (events.length > 0) {
            setEventSelected(Number(events[0].id));
        }
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
            <Header
                title='Calendario'
                actions={clientActions}
            />

            <div className={styles.content}>
                <div className={styles.timeline}>
                    {
                        sellEvents.length > 0 &&
                        <MessageSecondaryCard
                            title={"Hay docuentos que expiran hoy."}
                            icon={faFileExcel}
                            action={{
                                onClick: () => back(),
                                color: 'blue',
                                text: "Ver documentos"
                            }}
                        />
                    }

                    <MyTimeline
                        onClickEvent={handleSelectEventFromTimeline}
                        initialDateProp={decodedDate}
                        eventsOfTheDay={events}
                    />
                </div>

                {RenderEventSelects({ events, eventsOfTheDay, eventSelected })}
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
                visible={Sellid ? true : false}
                onClose={() => back()}
                sellEvents={sellEvents}
            />
        </div>
    );
}