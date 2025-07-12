import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { ColumnsBitacoraDetails } from '@/app/dashboard/bitacora/[id]/BitacoraDetailsColumns';
import CommentsModal from '@/app/dashboard/bitacora/[id]/CommentsModal';
import { MessageCard } from '@/components/Cards/MessageCard';
import Modal from '@/components/Modals/Modal';
import TimelineEventSelectedSkeleton from '@/components/Skeletons/TimelineEventSelected';
import TableTertiary from '@/components/UI/Tables/TableTertiary';
import MeetingInterface from '@/interface/meeting';
import { getMeetingById } from '@/services/bitacora/meeting.service';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelineEventSelectedInterface {
  eventSelected: number;
  isLoading: boolean
}

export default function TimelineEventSelected({
  eventSelected,
  isLoading
}: TimelineEventSelectedInterface): JSX.Element {

  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [meetingData, setMeetingData] = useState<MeetingInterface>();
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(true)

  const onOpenComments = (): void => setOpenCommentsModal(true);
  const { columns } = ColumnsBitacoraDetails({ onOpenComments });


  const fetchMeeting = useCallback(async (): Promise<void> => {
    if (isLoading) return;
    setIsLoadingMeeting(true)
    if (eventSelected) {
      const { meeting } = await getMeetingById(eventSelected.toString());
      setMeetingData(meeting);
    } else {
      setMeetingData(undefined)
    }
    setIsLoadingMeeting(false)
  }, [isLoading, eventSelected]);

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting, eventSelected, isLoading]);

  if (isLoading || isLoadingMeeting) {
    return <TimelineEventSelectedSkeleton />;
  }

  if (!meetingData) {
    return (
      <MessageCard title="Selecciona actividad" icon={faCalendarXmark}>
        <p>No tienes actividad seleccionado</p>
      </MessageCard>
    );
  }

  return (
    <aside className={styles.brief}>
      <p className={styles.brief__instruction}>
        Selecciona la actividad para ver el detalle.
      </p>
      <h4>Actividad</h4>

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
          value={meetingData?.Comentarios || ''}
          Id_Bitacora={eventSelected}
          setMeetingData={setMeetingData}
        />
      </Modal>

    </aside>
  )
}
