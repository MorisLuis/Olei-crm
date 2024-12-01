import React from 'react';
import { screenData } from '@/database/screens';
import styles from "../../../styles/pages/Cobranza.module.scss";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Cobranza')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Cobranza')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutCobranza({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.layoutCobranza}>
            {children}
        </div>
    )
}