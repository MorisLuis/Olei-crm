import React, { useState } from 'react';
import Button from '@/components/Buttons/Button';
import InputTextBox from '@/components/Inputs/inputTextBox';
import Modal from '@/components/Modals/Modal';
import useToast from '@/hooks/useToast';
import { cleanPhoneNumber } from '@/utils/cleanPhoneNumber';
import styles from '../../../../styles/pages/Sells.module.scss';

interface WhatsAppModalInterface {
  onClose: () => void;
  visible: boolean;
  phoneNumber?: string;
}

export default function WhatsAppModal({ onClose, visible, phoneNumber }: WhatsAppModalInterface) : JSX.Element | null {
  const { showSuccess } = useToast();
  const [messageSended, setMessageSended] = useState<string>('');
  const sendDisabled = messageSended === '';

  const onChangeWhatsappMessage = (value: string) : void => {
    setMessageSended(value);
  };

  const onSendWhatsapp = () : void => {
    if (messageSended === '') return;
    onClose();
    showSuccess('Whatsapp enviado exitosamente!');
    if(!phoneNumber) return;
    const phoneNumberProccess = cleanPhoneNumber(phoneNumber);
    const url = `https://wa.me/${phoneNumberProccess}?text=${encodeURIComponent(messageSended)}`;

    // Abre la URL en una nueva pestaña
    window.open(url, '_blank');
  };

  if (!phoneNumber) return null;

  return (
    <Modal title="Whatsapp" visible={visible} onClose={onClose} modalSize="small">
      <div className={styles.SellActions}>
        <div className={styles.send_message}>
          <div className={styles.send_header}>
            <p>Se enviara whatsapp a este numero: {phoneNumber}</p>
          </div>
          <div className={styles.send_input}>
            <InputTextBox
              value={messageSended}
              placeholder="Escribe el mensaje de whatsapp"
              onChange={onChangeWhatsappMessage}
            />
          </div>

          <div className={styles.message_decision}>
            <Button text="Enviar" disabled={sendDisabled} onClick={onSendWhatsapp} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
