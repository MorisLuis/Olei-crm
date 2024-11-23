import Button from '@/components/Buttons/Button'
import Input from '@/components/Inputs/inputs'
import React from 'react';
import styles from '../../../styles/pages/Sells.module.scss'

export default function CommentsModal() {
    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Escribe comentario de la tarea actual.</p>
                </div>
                <div className={styles.send_input}>
                    <Input
                        value=''
                        name='Commnets'
                        placeholder='Escribe un comentario...'
                    />
                </div>

                <div className={styles.message_decision}>
                    <Button text='Guardar' disabled={false} />
                </div>
            </div>
        </div>
    )
}
