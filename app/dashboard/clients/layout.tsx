import { screenData } from '@/database/screens';
import React from 'react';
import styles from "../../../styles/pages/Clients.module.scss";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Clientes')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Clientes')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutClients({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.layoutClients}>
            {children}
        </div>
    )
}
