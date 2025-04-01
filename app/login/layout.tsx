import React from 'react';
import { screenData } from '@/database/screens';

export async function generateMetadata(): Promise<{ title: string, description: string }> {
  const title = screenData.find((item) => item.name === 'Iniciar sesión')?.name || 'Default Title';
  const description =
    screenData.find((item) => item.name === 'Iniciar sesión')?.description || 'Default Description';

  return {
    title,
    description,
  };
}

export default function layoutLogin({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
  return <div>{children}</div>;
}
