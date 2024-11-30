"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import MeetingInterface from '@/interface/meeting';
import { meetingExample, meetingsExamples } from '@/seed/bitacoraData';
import { Tag } from '@/components/UI/Tag';
import { contactType } from '@/utils/contactType';
import { useTagColor } from '@/hooks/useTagColor'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@/components/Modals/Modal';
import CommentsModal from './ModalComments';
import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';
import styles from '../../../styles/pages/SellDetails.module.scss'

interface TableTertiaryBitacoraDetailsInterface {
    Id_Bitacora?: number;
}

export default function TableTertiaryBitacoraDetails({
    Id_Bitacora
}: TableTertiaryBitacoraDetailsInterface) {

    const pathname = usePathname();
    const [basePath, id] = pathname.split('/').filter(Boolean);
    const { changeColor } = useTagColor();
    const [openCommentsModal, setOpenCommentsModal] = useState(false);

    const sellsDataBack: MeetingInterface = meetingsExamples.find((item) => item.Id_Bitacora == (Id_Bitacora ?? Number(id))) ?? meetingExample; // API - Get product 
    const [sellsData, setSellsData] = useState(sellsDataBack)

    const columns: ColumnTertiaryConfig<MeetingInterface>[] = [
        {
            key: 'Title',
            label: 'Titulo',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Titulo</p>
                </div>
            )
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha</p>
                </div>
            ),
            render: (Fecha) => (
                <div className={styles.sellItem}>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            )
        },
        {
            key: 'Hour',
            label: 'Inicio / Fin',
            render: (_, item: MeetingInterface) => <span>{formatTime(item.Hour as string)} / {formatTime(item.HourEnd as string)}</span>,
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Hora</p>
                </div>
            )
        },
        {
            key: 'TipoContacto',
            label: 'TipoContacto',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Tipo de Contacto</p>
                </div>
            ),
            render: (TipoContacto) => (
                <div className={styles.sellItem}>
                    <Tag color={changeColor(TipoContacto as MeetingInterface['TipoContacto'])}>{contactType(TipoContacto as MeetingInterface['TipoContacto'])}</Tag>
                </div>
            )
        },
        {
            key: 'Id_Almacen',
            label: 'Id Almacen',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Almacen</p>
                </div>
            )
        },
        {
            key: 'Id_Cliente',
            label: 'Id Cliente',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Cliente</p>
                </div>
            )
        },
        {
            key: 'Descripcion',
            label: 'Descripcion',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Descripcion</p>
                </div>
            ),
            render: (value) => (
                <div className={styles.sellItem}>
                    <p className={styles.value}>{value?.toString()}</p>
                </div>
            )
        },
        {
            key: 'Comentarios',
            label: 'Comentarios',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Comentarios</p>
                </div>
            ),
            render: (value) => (
                <div className={styles.sellItem}>
                    <p className={styles.value}>{value?.toString()}</p>
                    <FontAwesomeIcon icon={faPen} className={`icon__small cursor ${styles.edit}`} onClick={() => setOpenCommentsModal(true)} />
                </div>
            )
        },
    ];

    useEffect(() => {
        setSellsData(sellsDataBack)
    }, [Id_Bitacora, sellsDataBack]);

    return (
        <>
            <div className={styles.sellDetails}>
                <TableTertiary
                    columns={columns}
                    data={sellsData}
                />
                <div style={{ display: 'none' }}>{basePath}</div>
            </div>
            <Modal
                title='Comentarios'
                visible={openCommentsModal}
                onClose={() => setOpenCommentsModal(false)}
                modalSize='small'
            >
                <CommentsModal onClose={() => setOpenCommentsModal(false)} value='' />
            </Modal>
        </>
    )
}
