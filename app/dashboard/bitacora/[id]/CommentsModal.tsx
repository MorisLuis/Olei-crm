import React, { useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import InputTextBox from '@/components/Inputs/inputTextBox';
import MeetingInterface from '@/interface/meeting';
import { updateMeeting } from '@/services/bitacora/meeting.service';
import styles from '../../../../styles/pages/Sells.module.scss';

interface CommentsModalInterface {
  Id_Bitacora: number;
  value: string;
  onClose: () => void;
  setMeetingData: React.Dispatch<React.SetStateAction<MeetingInterface | undefined>>;
}

export default function CommentsModal({
  Id_Bitacora,
  value: valueProp,
  onClose,
  setMeetingData,
}: CommentsModalInterface) : JSX.Element {
  const [newComments, setNewComments] = useState<string>('');

  const handleOnChangeComments = (value: string) : void => {
    setNewComments(value);
  };

  const onSubmitNewComment = async () : Promise<void> => {
  
    if (!newComments || !Id_Bitacora) return;
    const bodyMeeting: Partial<MeetingInterface> = {
      Comentarios: newComments,
    };

    const comments = await updateMeeting(bodyMeeting, Id_Bitacora);

    if (comments.Comentarios) {
      setMeetingData((prev) => {
        if (!prev) return prev;
        return { ...prev, Comentarios: comments.Comentarios };
      });
    }
    onClose();
  };

  useEffect(() => {
    setNewComments(valueProp);
  }, [valueProp]);

  return (
    <div className={styles.SellActions}>
      <div className={styles.send_message}>
        <div className={styles.send_header}>
          <p>Escribe comentario de la tarea actual.</p>
        </div>
        <div className={styles.send_input}>
          <InputTextBox
            value={newComments}
            placeholder="Escribe un comentario..."
            onChange={handleOnChangeComments}
          />
        </div>

        <div className={styles.message_decision}>
          <Button text="Guardar" disabled={false} onClick={onSubmitNewComment} />
        </div>
      </div>
    </div>
  );
}
