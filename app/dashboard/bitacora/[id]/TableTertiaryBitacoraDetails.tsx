"use client"

import TableTertiary from '@/components/UI/Tables/TableTertiary'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modals/Modal';
import CommentsModal from './ModalComments';
import styles from '../../../../styles/pages/SellDetails.module.scss'
import { getMeetingById } from '@/services/meeting';
import { ColumnsBitacoraDetails } from './ColumnsBitacoraDetails';

interface TableTertiaryBitacoraDetailsInterface {
    Id_Bitacora: number;
}

export default function TableTertiaryBitacoraDetails({
    Id_Bitacora
}: TableTertiaryBitacoraDetailsInterface) {

    const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [sellsData, setSellsData] = useState();
    const onOpenComments = () => setOpenCommentsModal(true)
    const { columns } = ColumnsBitacoraDetails({ onOpenComments })

    const handleGetMeeting = async () => {
        if(!Id_Bitacora) return;
        const meeting = await getMeetingById(Id_Bitacora.toString());
        setSellsData(meeting)
    }

    useEffect(() => {
        handleGetMeeting()
    }, [Id_Bitacora])

    if (!sellsData) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className={styles.sellDetails}>
                <TableTertiary
                    columns={columns}
                    data={sellsData}
                />
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
