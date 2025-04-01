import React from 'react';
import { screenData } from '@/database/screens';
import styles from '../../../styles/pages/Calendar.module.scss';

export async function generateMetadata(): Promise<{ title: string, description: string }> {
  const title = screenData.find((item) => item.name === 'Calendario')?.name || 'Default Title';
  const description =
    screenData.find((item) => item.name === 'Calendario')?.description || 'Default Description';

  return {
    title,
    description,
  };
}

export default function layoutCalendar({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <div className={styles.page}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
