import React from 'react';
import styles from "../../../styles/pages/Settings.module.scss";
import { screenData } from '@/database/screens';

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Configuracion')?.name
    const description = screenData.find((item) => item.name === 'Configuracion')?.description
    return {
        title,
        description,
    };
}

export default function Settings() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Configuración</p>
            </main>
        </div>
    )
}
