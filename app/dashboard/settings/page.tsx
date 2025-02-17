"use client";

import React from 'react';
import styles from "../../../styles/pages/Settings.module.scss";
import { api } from '@/api/api';

/* export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Configuracion')?.name
    const description = screenData.find((item) => item.name === 'Configuracion')?.description
    return {
        title,
        description,
    };
} */

export default function Settings() {


    const handleDownload = async () => {
        try {
            // Hacemos la solicitud GET al servidor para obtener el archivo Excel
            const response = await api.get('/api/utils/excell', {
                responseType: 'blob',  // Importante para indicar que queremos recibir el archivo como blob
            });

            // Creamos un enlace temporal para iniciar la descarga
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'datos.xlsx'); // El nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();  // Disparamos el clic para iniciar la descarga
            document.body.removeChild(link);  // Limpiamos el enlace temporal
        } catch (error) {
            console.error('Error descargando el archivo:', error);
        }
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Configuración</p>
                <button onClick={handleDownload}>Descargar</button>
            </main>
        </div>
    )
}
