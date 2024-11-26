"use client";

import React, { useState, useEffect } from 'react';
import MyTimeline from '../../Timeline';
import Header from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/bitacora/[id]/TableTertiaryBitacoraDetails';
import Modal from '@/components/Modals/Modal';
import styles from "../../../../styles/pages/Calendar.module.scss";
import MeetingInterface from '@/interface/meeting';

export default function EventDetails() {
    const [openModalEvent, setOpenModalEvent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [eventSelected, setEventSelected] = useState<number>(1)

    // Abrir modal solo en móviles
    const handleEventClick = (Id: MeetingInterface) => {
        if (isMobile) setOpenModalEvent(true);
        setEventSelected(Id.Id_Bitacora ?? 1)
    };

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
            <Header title='Calendario' />
            <div className={styles.content}>
                <div className={styles.timeline}>
                    <MyTimeline onClickEvent={handleEventClick} />
                </div>
                <div className={styles.brief}>
                    <p className={styles.brief__instruction}>Selecciona la tarea para ver el detalle de la tarea.</p>
                    <h4>Reunión</h4>
                    <TableTertiaryBitacoraDetails Id_Bitacora={eventSelected} />
                </div>
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
        </div>
    );
}
