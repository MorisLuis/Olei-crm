import Button from '@/components/Buttons/Button'
import Input from '@/components/Inputs/input'
import React from 'react';
import styles from '../../../styles/pages/Sells.module.scss'

export default function EmailModal() {
    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Se enviara este correo al correo: moradoluisenrique@gmail.com</p>
                </div>
                <div className={styles.send_input}>
                    <Input
                        value=''
                        name='Asunto'
                        placeholder='Escribe el asunto.'
                    />
                    <Input
                        value=''
                        name='Email'
                        placeholder='Escribe el correo'
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
