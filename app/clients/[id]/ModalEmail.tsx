import Button from '@/components/Buttons/Button'
import Input from '@/components/Inputs/input'
import React, { useState } from 'react';
import styles from '../../../styles/pages/Sells.module.scss'
import InputTextBox from '@/components/Inputs/inputTextBox';
import useToast from '@/hooks/useToast';

interface EmailModalInterface {
    onClose: () => void;
};

export default function EmailModal({
    onClose
} : EmailModalInterface ) {

    const { showSuccess } = useToast()

    const [messageSended, setMessageSended] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    const sendDisabled = subject === "" || messageSended === ""

    const onChangeEmaiSubjectlMessage = (value: string) => {
        setSubject(value)
    }
    const onChangeEmailMessage = (value: string) => {
        setMessageSended(value)
    }

    const onSendEmailPredetermined = () => {
        onClose()
        showSuccess('Correo enviado exitosamente!')
    }

    const onSendEmail = () => {
        if(subject === '') return;
        if(messageSended === '') return;
        onClose()
        showSuccess('Correo enviado exitosamente!')
    }

    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Se enviara este correo al correo: moradoluisenrique@gmail.com</p>
                </div>
                <div className={styles.send_input}>
                    <Input
                        value={subject}
                        name='Asunto'
                        placeholder='Escribe el asunto.'
                        onChange={onChangeEmaiSubjectlMessage}
                    />
                    <InputTextBox
                        value={messageSended}
                        placeholder='Escribe el mensaje'
                        onChange={onChangeEmailMessage}
                    />
                </div>

                <div className={styles.message_decision}>
                    <Button text='Mensaje Predeterminado' disabled={false} className="white" onClick={onSendEmailPredetermined}/>
                    <Button text='Enviar' disabled={sendDisabled} onClick={onSendEmail}/>
                </div>
            </div>
        </div>
    )
}
