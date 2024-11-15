import React from 'react';
import styles from "../../styles/pages/Bitacora.module.scss";
import { screenData } from "@/database/screens";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Bitacora')?.name
    const description = screenData.find((item) => item.name === 'Bitacora')?.description
    return {
        title,
        description,
    };
};
export default function Bitacora() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Bitacora</p>
            </main>
        </div>
        )
}
