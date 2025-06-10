'use client';

import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import Modal from '@/components/Modals/Modal';
import TableTertiary from '@/components/UI/Tables/TableTertiary';
import MeetingInterface from '@/interface/meeting';
import { getMeetingById } from '@/services/bitacora/meeting.service';
import { ColumnsBitacoraDetails } from './BitacoraDetailsColumns';
import CommentsModal from './CommentsModal';
import styles from '../../../../styles/pages/SellDetails.module.scss';

interface TableTertiaryBitacoraDetailsInterface {
  Id_Bitacora: number;
  isLoading: boolean;
}

export default function BitacoraDetailsTable({
  Id_Bitacora,
  isLoading
}: TableTertiaryBitacoraDetailsInterface): JSX.Element {
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [isLoadingMeetingData, setIsLoadingMeetingData] = useState(true)

  const onOpenComments = (): void => setOpenCommentsModal(true);
  const { columns } = ColumnsBitacoraDetails({ onOpenComments });

  const fetchMeeting = useCallback(async () : Promise<void> => {
    if(isLoading) return;

    if(Id_Bitacora) {
      const { meeting } = await getMeetingById(Id_Bitacora.toString());
      setMeetingData(meeting);
    } else {
      setMeetingData(undefined)
    }

    setIsLoadingMeetingData(false);
  }, [isLoading, Id_Bitacora]);

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting, Id_Bitacora, isLoading]);

  if (isLoading || isLoadingMeetingData) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!meetingData) {
    return (
      <MessageCard title="Selecciona actividad" icon={faCalendarXmark}>
        <p>No tienes actividad seleccionado</p>
      </MessageCard>
    );
  }

  return (
    <>
      <div className={styles.sellDetails}>
        <TableTertiary columns={columns} data={meetingData} />
      </div>

      <Modal
        title="Comentarios"
        visible={openCommentsModal}
        onClose={() => setOpenCommentsModal(false)}
        modalSize="small"
      >
        <CommentsModal
          onClose={() => setOpenCommentsModal(false)}
          value={meetingData.Comentarios || ''}
          Id_Bitacora={Id_Bitacora}
          setMeetingData={setMeetingData}
        />
      </Modal>
    </>
  );
}
