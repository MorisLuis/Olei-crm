import Button from '@/components/Buttons/Button'
import Input from '@/components/Inputs/input'
import React, { useContext, useState } from 'react';
import styles from '../../../../styles/pages/Sells.module.scss'
import InputTextBox from '@/components/Inputs/inputTextBox';
import useToast from '@/hooks/useToast';
import Modal from '@/components/Modals/Modal';
import { postEmail, postEmailInterface } from '@/services/email';
import { AuthContext } from '@/context/auth/AuthContext';

interface EmailModalInterface {
    onClose: () => void;
    visible: boolean;
    email?: string;
};

export default function EmailModal({
    onClose,
    visible,
    email
}: EmailModalInterface) {

    const { showSuccess } = useToast();
    const { user: { Id: remitente } } = useContext(AuthContext);

    const [messageSended, setMessageSended] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    const sendDisabled = subject === "" || messageSended === ""

    const onChangeEmaiSubjectlMessage = (value: string) => {
        setSubject(value)
    }
    const onChangeEmailMessage = (value: string) => {
        setMessageSended(value)
    }

/*     const onSendEmailPredetermined = () => {
        onClose()
        showSuccess('Correo enviado exitosamente!')
    } */

    const onSendEmail = async () => {
        if (subject === '') return;
        if (messageSended === '') return;
        if (!email) return;

        try {            
            const emailBody: postEmailInterface = {
                destinatario: email,
                remitente: remitente,
                text: messageSended,
                subject: subject
            };
    
            await postEmail(emailBody)
            onClose()
            showSuccess('Correo enviado exitosamente!')
        } catch (error) {
            console.log({error})
        }

    }

    if (!email) return;

    return (
        <Modal
            title='Correo electronico'
            visible={visible}
            onClose={onClose}
            modalSize='small'
        >
            <div className={styles.SellActions}>
                <div className={styles.send_message}>
                    <div className={styles.send_header}>
                        <p>Se enviara este correo al correo: {email}</p>
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
                        <Button text='Enviar' disabled={sendDisabled} onClick={onSendEmail} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
