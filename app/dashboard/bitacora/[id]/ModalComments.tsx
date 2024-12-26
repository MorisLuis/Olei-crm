import Button from '@/components/Buttons/Button'
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/pages/Sells.module.scss'
import InputTextBox from '@/components/Inputs/inputTextBox';
import { updateMeeting } from '@/services/meeting';
import MeetingInterface from '@/interface/meeting';

interface CommentsModalInterface {
    Id_Bitacora: number;
    value: string;
    onClose: () => void;
}

export default function CommentsModal({
    Id_Bitacora,
    value : valueProp,
    onClose
} : CommentsModalInterface) {

    const [newComments, setNewComments] = useState<string>('');
    
    const handleOnChangeComments = (value: string) => {
        setNewComments(value)
    }

    const onSubmitNewComment = async () => {
        if(!newComments || !Id_Bitacora) return;
        const bodyMeeting : Partial<MeetingInterface> = {
            Comentarios: newComments
        }
        await updateMeeting(bodyMeeting, Id_Bitacora)
        onClose()
    }

    useEffect(() => {
        setNewComments(valueProp)
    },[valueProp])

    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Escribe comentario de la tarea actual.</p>
                </div>
                <div className={styles.send_input}>
                    <InputTextBox
                        value={newComments}
                        placeholder='Escribe un comentario...'
                        onChange={handleOnChangeComments}
                    />
                </div>

                <div className={styles.message_decision}>
                    <Button text='Guardar' disabled={false} onClick={onSubmitNewComment}/>
                </div>
            </div>
        </div>
    )
}
