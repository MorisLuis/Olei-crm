import Button from '@/components/Buttons/Button'
import Input from '@/components/Inputs/input'
import React from 'react';
import styles from '../../../styles/pages/Sells.module.scss'

export default function WhatsAppModal() {
    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Se enviara whatsapp a este numero: 90320974907</p>
                </div>
                <div className={styles.send_input}>
                    <Input
                        value=''
                        name='Whatsapp'
                        placeholder='Escribe el mensaje de whatsapp'
                    />
                </div>

                <div className={styles.message_decision}>
                    <Button text='Mensaje Predeterminado' disabled={false} className="white" />
                    <Button text='Enviar' disabled={false} />
                </div>
            </div>
        </div>
    )
}
