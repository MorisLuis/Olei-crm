"use client"

import TableTertiary from '@/components/UI/Tables/TableTertiary'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/Modals/Modal';
import CommentsModal from './ModalComments';
import styles from '../../../../styles/pages/SellDetails.module.scss'
import { getMeetingById } from '@/services/meeting';
import { ColumnsBitacoraDetails } from './ColumnsBitacoraDetails';
import MeetingInterface from '@/interface/meeting';

interface TableTertiaryBitacoraDetailsInterface {
    Id_Bitacora: number;
}

export default function TableTertiaryBitacoraDetails({
    Id_Bitacora
}: TableTertiaryBitacoraDetailsInterface) {

    const [openCommentsModal, setOpenCommentsModal] = useState(false);
    const [meetingData, setMeetingData] = useState<MeetingInterface>();
    const onOpenComments = () => setOpenCommentsModal(true)
    const { columns } = ColumnsBitacoraDetails({ onOpenComments })

    const handleGetMeeting = useCallback(async () => {
        if (!Id_Bitacora) return;
        const meeting = await getMeetingById(Id_Bitacora.toString());
        setMeetingData(meeting)
    }, [Id_Bitacora])

    useEffect(() => {
        handleGetMeeting()
    }, [Id_Bitacora, handleGetMeeting])

    if (!meetingData) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div className={styles.sellDetails}>
                <TableTertiary
                    columns={columns}
                    data={meetingData}
                />
            </div>
            <Modal
                title='Comentarios'
                visible={openCommentsModal}
                onClose={() => setOpenCommentsModal(false)}
                modalSize='small'
            >
                <CommentsModal
                    onClose={() => setOpenCommentsModal(false)}
                    value={meetingData.Comentarios || ""}
                    Id_Bitacora={Id_Bitacora}
                />
            </Modal>
        </>
    )
}
