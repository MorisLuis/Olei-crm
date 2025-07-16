import { useParams, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import Modal from '@/components/Modals/Modal';
import { AuthContext } from '@/context/auth/AuthContext';
import useToast from '@/hooks/useToast';
import { CobranzaByClientFilters } from '@/services/cobranza/cobranza.interface';
import { PostEmailCobranzaParams } from '@/services/email/email.interface';
import { postEmailCobranza } from '@/services/email/email.service';
import styles from '../../../../styles/pages/Cobranza.module.scss';

export interface ShareCobranzaModalInterface {
  visible: boolean;
  onClose: () => void;
  email: string;
  clientName: string;
  filters: CobranzaByClientFilters;
}

export default function ShareCobranzaModal({
  visible,
  onClose,
  email,
  clientName,
  filters
}: ShareCobranzaModalInterface): JSX.Element {

  const { user: { Id: remitente, Nombre } } = useContext(AuthContext);
  const { id: idCliente } = useParams();
  const searchParams = useSearchParams();

  const { showPromise } = useToast();
  const idAlmacen = searchParams.get('Id_Almacen');

  const [downloadingPDF, setDownloadingPDF] = useState(false);


  const onSendPdfToEmail = async (): Promise<void | null> => {

    setDownloadingPDF(true);
    if (!email) return null;
    if (!Nombre) return null;
    if (!idCliente) return null;

    const emailBody: PostEmailCobranzaParams = {
      destinatario: email,
      remitente: Nombre,
      text: 'Relacion',
      subject: 'Relacion de cobranza',
      nombreRemitente: clientName,
      Id_Cliente: Number(idCliente),
      Id_Almacen: Number(idAlmacen),
      filters,
      PageNumber: 1
    };

    const myCsvPromise = postEmailCobranza(emailBody);
    showPromise('Enviando', 'Se ha enviado tu PDF!', myCsvPromise);
    setDownloadingPDF(false);
    onClose();

  };

  return (
    <Modal
      visible={visible}
      title="Compartir relación"
      onClose={onClose}
      modalSize="small"
      finalHeight="content"
    >
      <div className={styles.modalShareCobranza}>
        <p className={styles.title}>
          Compartir con {remitente} al correo {email}, su relación de cobranza.
        </p>
        <div className={styles.actions}>
          <ButtonLoad
            buttonText="Compartir PDF"
            loading={downloadingPDF}
            color="blue"
            onClick={onSendPdfToEmail}
            disabled={!email}
          />
        </div>
      </div>
    </Modal>
  );
}
