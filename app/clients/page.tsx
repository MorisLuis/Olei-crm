import React from 'react';
import styles from "../../styles/pages/Clients.module.scss";
import { screenData } from "@/database/screens";

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Clientes')?.name
    const description = screenData.find((item) => item.name === 'Clientes')?.description
    return {
        title,
        description,
    };
};

export default function Clients() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Clientes</p>
            </main>
        </div>
        )
}
