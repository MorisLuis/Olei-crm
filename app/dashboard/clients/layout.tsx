import React from 'react';
import { screenData } from '@/database/screens';
import styles from '../../../styles/pages/Clients.module.scss';

export async function generateMetadata(): Promise<{ title: string, description: string }> {
  const title = screenData.find((item) => item.name === 'Clientes')?.name || 'Default Title';
  const description =
    screenData.find((item) => item.name === 'Clientes')?.description || 'Default Description';

  return {
    title,
    description,
  };
}

export default function layoutClients({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
  return <div className={styles.layoutClients}>{children}</div>;
}
