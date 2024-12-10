import { screenData } from '@/database/screens';
import React from 'react';
import styles from "../../../styles/pages/Bitacora.module.scss";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Bitacora')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Bitacora')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutBitacora({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.layoutBitacora}>
            {children}
        </div>
    )
}
