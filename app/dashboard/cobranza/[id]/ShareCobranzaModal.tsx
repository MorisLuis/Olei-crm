import React, { useContext, useState } from 'react';
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import Modal from '@/components/Modals/Modal';
import { AuthContext } from '@/context/auth/AuthContext';
import useToast from '@/hooks/useToast';
import { FilterSellsByClient } from '@/interface/sells';
import { postEmailCobranza, postEmailCobranzaInterface } from '@/services/email';
import styles from '../../../../styles/pages/Cobranza.module.scss';

interface ShareCobranzaModalInterface {
  visible: boolean;
  onClose: () => void;
  email: string;
  clientName: string;
  filters: FilterSellsByClient;
}

export default function ShareCobranzaModal({
  visible,
  onClose,
  email,
  clientName,
  filters
}: ShareCobranzaModalInterface): JSX.Element {
  const {
    user: { Id: remitente, Id_Cliente, Nombre },
  } = useContext(AuthContext);

  const [downloadingCSV, setDownloadingCSV] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  const { showPromise } = useToast();

  const onDownloadCSV = async (): Promise<void> => {
    await new Promise((resolve) => {
      setTimeout((): void | null => {
        setDownloadingCSV(false);
        onClose();
        resolve(null); // Resolviendo la promesa después de que se completa el timeout
      }, 2000);
    });
  };

  const handleDownloadCSV = async (): Promise<void> => {
    setDownloadingCSV(true);
    const myCsvPromise = onDownloadCSV();
    showPromise('Descargando', 'Se ha descargado tu CSV!', myCsvPromise);
  };

  const handleDownloadPDF = async (): Promise<void | null> => {
    setDownloadingPDF(true);
    if (!email) return null;
    if (!Nombre) return null;

    const emailBody: postEmailCobranzaInterface = {
      destinatario: email,
      remitente: Nombre,
      text: 'Relacion',
      subject: 'Relacion de cobranza',
      nombreRemitente: clientName,
      Id_Cliente,
      filters,
      PageNumber: 1
    };

    const myCsvPromise = postEmailCobranza(emailBody);
    showPromise('Enviando', 'Se ha enviado tu PDF!', myCsvPromise);
    setDownloadingPDF(false);
    onClose();
  };

  return (
    <Modal visible={visible} title="Compartir relación" onClose={onClose} modalSize="small">
      <div className={styles.modalShareCobranza}>
        <p className={styles.title}>
          Compartir con {remitente} al correo {email}, su relación de cobranza.
        </p>
        <div className={styles.actions}>
          {/* <ButtonLoad
            buttonText="Compartir CSV"
            loading={downloadingCSV}
            color="white"
            onClick={handleDownloadCSV}
            disabled={!email}
          /> */}
          <ButtonLoad
            buttonText="Compartir PDF"
            loading={downloadingPDF}
            color="blue"
            onClick={handleDownloadPDF}
            disabled={!email}
          />
        </div>
      </div>
    </Modal>
  );
}
