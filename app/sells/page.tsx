import React from 'react';
import styles from "../../styles/pages/Sells.module.scss";
import { screenData } from "@/database/screens";
import TableSells from './TableSells';

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Ventas')?.name
    const description = screenData.find((item) => item.name === 'Ventas')?.description
    return {
        title,
        description,
    };
};

export default function Sells() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Sells</p>
                <TableSells/>
            </main>
        </div>
    )
}
