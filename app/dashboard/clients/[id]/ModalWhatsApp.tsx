import Button from '@/components/Buttons/Button'
import React, { useState } from 'react';
import useToast from '@/hooks/useToast';
import InputTextBox from '@/components/Inputs/inputTextBox';
import Modal from '@/components/Modals/Modal';
import styles from '../../../../styles/pages/Sells.module.scss'

interface WhatsAppModalInterface {
    onClose: () => void;
    visible: boolean;
    phoneNumber?: string;
}

export default function WhatsAppModal({
    onClose,
    visible,
    phoneNumber
}: WhatsAppModalInterface) {

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
        if (messageSended === '') return;
        onClose()
        showSuccess('Whatsapp enviado exitosamente!')
    }

    if (!phoneNumber) return;

    return (
        <Modal
            title='Whatsapp'
            visible={visible}
            onClose={onClose}
            modalSize='small'
        >

            <div className={styles.SellActions}>
                <div className={styles.send_message}>
                    <div className={styles.send_header}>
                        <p>Se enviara whatsapp a este numero: {phoneNumber}</p>
                    </div>
                    <div className={styles.send_input}>
                        <InputTextBox
                            value={messageSended}
                            placeholder='Escribe el mensaje de whatsapp'
                            onChange={onChangeWhatsappMessage}
                        />
                    </div>

                    <div className={styles.message_decision}>
                        <Button text='Mensaje Predeterminado' disabled={false} className="white" onClick={onSendWhatsappPredetermined} />
                        <Button text='Enviar' disabled={sendDisabled} onClick={onSendWhatsapp} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
