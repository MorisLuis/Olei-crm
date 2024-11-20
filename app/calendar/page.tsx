import React from 'react';
import styles from "../../styles/pages/Calendar.module.scss";
import { screenData } from "@/database/screens";
import MyCalendar from './Calendar';

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Calendario')?.name
    const description = screenData.find((item) => item.name === 'Calendario')?.description
    return {
        title,
        description,
    };
};

export default function Calendar() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>Calendario</p>
                <MyCalendar/>
            </main>
        </div>
    )
}
