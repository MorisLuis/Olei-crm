import Modal from '@/components/Modals/Modal';
import React, { useState } from 'react';
import styles from "../../../../styles/pages/Cobranza.module.scss";
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import useToast from '@/hooks/useToast';

interface ShareCobranzaModalInterface {
    visible: boolean;
    onClose: () => void;
}

export default function ShareCobranzaModal({
    visible,
    onClose
} : ShareCobranzaModalInterface ) {

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
    
        const onDownloadCSV = async () => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    setDownloadingPDF(false);
                    onClose();
                    resolve(null); // Resolviendo la promesa después de que se completa el timeout
                }, 2000);
            });
        };
    
        const myCsvPromise = onDownloadCSV();
        showPromise("Descargando", "Se ha descargado tu PDF!", myCsvPromise);
    };

    return (
        <Modal
            visible={visible}
            title='Compartir relación'
            onClose={onClose}
            modalSize='small'
        >
            <div className={styles.modalShareCobranza}>
                <p className={styles.title}>Compartir con Empresa 1, su relación de cobranza.</p>
                <div className={styles.actions}>
                    <ButtonLoad buttonText='Compartir CSV' loading={downloadingCSV} color='white' onClick={handleDownloadCSV}/>
                    <ButtonLoad buttonText='Compartir PDF' loading={downloadingPDF} color='blue' onClick={handleDownloadPDF}/>
                </div>
            </div>
        </Modal>
    )
}
