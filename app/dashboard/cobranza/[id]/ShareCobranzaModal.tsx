import Modal from '@/components/Modals/Modal';
import React, { useContext, useState } from 'react';
import styles from "../../../../styles/pages/Cobranza.module.scss";
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import useToast from '@/hooks/useToast';
import { postEmailCobranza, postEmailCobranzaInterface } from '@/services/email';
import { AuthContext } from '@/context/auth/AuthContext';
import { FilterSellsByClient } from '@/interface/sells';

interface ShareCobranzaModalInterface {
    visible: boolean;
    onClose: () => void;
    email?: string
    clientName: string;
    filters: FilterSellsByClient,
    client: number
}

export default function ShareCobranzaModal({
    visible,
    onClose,
    email,
    clientName,
    filters,
    client
} : ShareCobranzaModalInterface ) {

    const { user: { Id: remitente, Id_Cliente, Nombre } } = useContext(AuthContext);

    const [downloadingCSV, setDownloadingCSV] = useState(false);
    const [downloadingPDF, setDownloadingPDF] = useState(false)

    const { showPromise } = useToast()

    const handleDownloadCSV = async () => {
        setDownloadingCSV(true);
    
        const onDownloadCSV = async () => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    setDownloadingCSV(false);
                    onClose();
                    resolve(null); // Resolviendo la promesa después de que se completa el timeout
                }, 2000);
            });
        };
    
        const myCsvPromise = onDownloadCSV();
        showPromise("Descargando", "Se ha descargado tu CSV!", myCsvPromise);
    };

    const handleDownloadPDF = async () => {
        setDownloadingPDF(true);

        if(!email) return;
        if(!Nombre) return;

        const emailBody: postEmailCobranzaInterface = {
            destinatario: email,
            remitente: Nombre,
            text: 'Relacion',
            subject: 'Relacion de cobranza',
            nombreRemitente: clientName,
            Id_Cliente,
            filters,
            PageNumber: 1,
            client
        };
    
        const myCsvPromise = postEmailCobranza(emailBody);
        showPromise("Enviando", "Se ha enviado tu PDF!", myCsvPromise);
        setDownloadingPDF(false);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            title='Compartir relación'
            onClose={onClose}
            modalSize='small'
        >
            <div className={styles.modalShareCobranza}>
                <p className={styles.title}>Compartir con {remitente} al correo {email}, su relación de cobranza.</p>
                <div className={styles.actions}>
                    <ButtonLoad buttonText='Compartir CSV' loading={downloadingCSV} color='white' onClick={handleDownloadCSV}/>
                    <ButtonLoad buttonText='Compartir PDF' loading={downloadingPDF} color='blue' onClick={handleDownloadPDF}/>
                </div>
            </div>
        </Modal>
    )
}
