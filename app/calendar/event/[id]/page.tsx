"use client";

import React, { useState, useEffect } from 'react';
import MyTimeline from '../../Timeline';
import Header from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from '@/app/bitacora/[id]/TableTertiaryBitacoraDetails';
import styles from "../../../../styles/pages/Calendar.module.scss";
import Modal from '@/components/Modals/Modal';

export default function EventDetails() {
    const [openModalEvent, setOpenModalEvent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 912); // Umbral para considerar "móvil"
        };

        handleResize(); // Verificar en el primer render
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Abrir modal solo en móviles
    const handleEventClick = () => {
        if (isMobile) {
            setOpenModalEvent(true);
        }
    };

    return (
        <>
            <div className={styles.event}>
                <Header title='Calendario' />
                <div className={styles.content}>
                    <div className={styles.timeline}>
                        <MyTimeline onClickEvent={handleEventClick} />
                    </div>
                    <div className={styles.brief}>
                        <p className={styles.brief__instruction}>Selecciona la tarea para ver el detalle de la tarea.</p>
                        <h4>Reunión</h4>
                        <TableTertiaryBitacoraDetails />
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
                        <TableTertiaryBitacoraDetails />
                    </div>
                </Modal>
            </div>
        </>
    );
}
