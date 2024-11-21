"use client";

import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard'
import { clientDetailsExample } from '@/seed/clientsData';
import React, { useState } from 'react'
import Header, { ActionsInterface } from '@/components/navigation/header';
import Modal from '@/components/Modals/Modal';
import WhatsAppModal from './ModalWhatsApp';
import EmailModal from './ModalEmail';
import { useRouter } from 'next/navigation';
import MyCalendar from '@/app/calendar/Calendar';
import styles from "../../../styles/pages/Clients.module.scss";

export default function ClientDetailsPage() {

    const { push } = useRouter();
    const [openModalWhatsApp, setOpenModalWhatsApp] = useState(false);
    const [openModalEmail, setOpenModalEmail] = useState(false);


    const briefData: briefDataInterface[] = [
        { id: 1, label: 'Nombre', value: `${clientDetailsExample?.Nombre ?? ''}` },
        { id: 2, label: 'RazonSocial', value: `${clientDetailsExample?.RazonSocial ?? 'N/A'}` },
        { id: 3, label: 'Telefono', value: `${clientDetailsExample?.Telefono1 ?? 'N/A'}` },
        { id: 4, label: 'Correo', value: `${clientDetailsExample?.CorreoVtas ?? 'N/A'}` }
    ];

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
            text: 'Reunión',
            onclick: () => console.log("Reunión")
        },
        {
            id: 4,
            text: 'Ventas',
            onclick: () => push(`/sells/${clientDetailsExample.Id_Cliente}`)
        },
        {
            id: 5,
            text: 'Cobranza',
            onclick: () => console.log()
        }
    ]


    return (
        <>
            <Header title={`${clientDetailsExample.Nombre}`} actions={clientActions} />
            <div className={styles.clientDetails}>
                <div className={styles.clientDetails__calendar}>
                    <MyCalendar/>
                </div>
                <div className={styles.clientDetails__brief}>
                    <BriefCard data={briefData} header='Detalles de empresa'/>
                </div>
            </div>

            <Modal
                title='Whatsapp'
                visible={openModalWhatsApp}
                onClose={() => setOpenModalWhatsApp(false)}
                modalSize='small'
            >
                <WhatsAppModal />
            </Modal>

            <Modal
                title='Correo electronico'
                visible={openModalEmail}
                onClose={() => setOpenModalEmail(false)}
                modalSize='small'
            >
                <EmailModal />
            </Modal>
        </>
    )
}
