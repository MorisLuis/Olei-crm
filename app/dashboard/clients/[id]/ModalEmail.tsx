import React, { useContext, useState } from 'react';
import Button from '@/components/Buttons/Button';
import Input from '@/components/Inputs/input';
import InputTextBox from '@/components/Inputs/inputTextBox';
import Modal from '@/components/Modals/Modal';
import { AuthContext } from '@/context/auth/AuthContext';
import useToast from '@/hooks/useToast';
import { postEmail, postEmailInterface } from '@/services/email';
import styles from '../../../../styles/pages/Sells.module.scss';

interface EmailModalInterface {
  onClose: () => void;
  visible: boolean;
  email?: string;
}

export default function EmailModal({ onClose, visible, email }: EmailModalInterface): JSX.Element | null {
  const { showSuccess } = useToast();
  const { user: { Id_UsuarioOOL } } = useContext(AuthContext);

  const [messageSended, setMessageSended] = useState<string>('');
  const [subject, setSubject] = useState<string>('');

  const sendDisabled = subject === '' || messageSended === '';

  const onChangeEmaiSubjectlMessage = (value: string): void => {
    setSubject(value);
  };
  const onChangeEmailMessage = (value: string): void => {
    setMessageSended(value);
  };

  const onSendEmail = async (): Promise<void> => {
    if (subject === '') return;
    if (messageSended === '') return;
    if (!email) return;
    //if (!remitente) return;

    try {
      const emailBody: postEmailInterface = {
        destinatario: email,
        remitente: Id_UsuarioOOL.trim(),
        text: messageSended,
        subject: subject,
      };

      await postEmail(emailBody);
      onClose();
      showSuccess('Correo enviado exitosamente!');
    } catch (error) {
      console.error({ error });
    }
  };

  if (!email) return null;

  return (
    <Modal title="Correo electronico" visible={visible} onClose={onClose} modalSize="small" finalHeight="content">
      <div className={styles.SellActions}>
        <div className={styles.send_message}>
          <div className={styles.send_header}>
            <p>Se enviara este correo a: {email}</p>
          </div>
          <div className={styles.send_input}>
            <Input
              value={subject}
              name="Asunto"
              placeholder="Escribe el asunto."
              onChange={onChangeEmaiSubjectlMessage}
            />
            <InputTextBox
              value={messageSended}
              placeholder="Escribe el mensaje"
              onChange={onChangeEmailMessage}
            />
          </div>

          <div className={styles.message_decision}>
            <Button text="Enviar" disabled={sendDisabled} onClick={onSendEmail} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
