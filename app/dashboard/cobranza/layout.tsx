import React from 'react';
import { screenData } from '@/database/screens';
import styles from '../../../styles/pages/Cobranza.module.scss';

export async function generateMetadata(): Promise<{ title: string, description: string }> {
  const title = screenData.find((item) => item.name === 'C x C')?.name || 'Default Title';
  const description =
    screenData.find((item) => item.name === 'C x C')?.description || 'Default Description';

  return {
    title,
    description,
  };
}

export default function layoutCobranza({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
  return <div className={styles.layoutCobranza}>{children}</div>;
}
