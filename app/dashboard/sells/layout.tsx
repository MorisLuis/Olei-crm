import React from 'react';
import { screenData } from '@/database/screens';
import styles from "../../../styles/pages/Sells.module.scss";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Ventas')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Ventas')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutSells({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.layoutSells}>
            {children}
        </div>
    )
}
