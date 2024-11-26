import Button from '@/components/Buttons/Button'
import React, { useState } from 'react';
import styles from '../../../styles/pages/Sells.module.scss'
import useToast from '@/hooks/useToast';
import InputTextBox from '@/components/Inputs/inputTextBox';

interface WhatsAppModalInterface {
    onClose: () => void;

}

export default function WhatsAppModal({
    onClose
} : WhatsAppModalInterface ) {

    const { showSuccess } = useToast()

    const [messageSended, setMessageSended] = useState<string>('');

    const sendDisabled = messageSended === ""

    const onChangeWhatsappMessage = (value: string) => {
        setMessageSended(value)
    }

    const onSendWhatsappPredetermined = () => {
        onClose()
        showSuccess('Whatsapp enviado exitosamente!')
    }

    const onSendWhatsapp = () => {
        if(messageSended === '') return;
        onClose()
        showSuccess('Whatsapp enviado exitosamente!')
    }

    return (
        <div className={styles.SellActions}>
            <div className={styles.send_message}>
                <div className={styles.send_header}>
                    <p>Se enviara whatsapp a este numero: 90320974907</p>
                </div>
                <div className={styles.send_input}>
                    <InputTextBox
                        value={messageSended}
                        placeholder='Escribe el mensaje de whatsapp'
                        onChange={onChangeWhatsappMessage}
                    />
                </div>

                <div className={styles.message_decision}>
                    <Button text='Mensaje Predeterminado' disabled={false} className="white" onClick={onSendWhatsappPredetermined}/>
                    <Button text='Enviar' disabled={sendDisabled} onClick={onSendWhatsapp}/>
                </div>
            </div>
        </div>
    )
}
