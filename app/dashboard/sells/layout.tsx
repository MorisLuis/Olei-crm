import React from 'react';
import Header from '@/components/navigation/header';
import { screenData } from '@/database/screens';
import styles from '../../../styles/pages/Sells.module.scss';

export async function generateMetadata(): Promise<{ title: string, description: string }> {
  const title = screenData.find((item) => item.name === 'Ventas')?.name || 'Default Title';
  const description =
    screenData.find((item) => item.name === 'Ventas')?.description || 'Default Description';

  return {
    title,
    description,
  };
}

export default function layoutSells({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {

  return (
    <>
      <Header title="Ventas" dontShowBack />
      <div className={styles.layoutSells}>{children}</div>
    </>
  );
}
