import { screenData } from '@/database/screens';
import React from 'react';
import styles from "../../../styles/pages/Calendar.module.scss";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Calendario')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Calendario')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutCalendar({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
