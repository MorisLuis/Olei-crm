'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Header from '@/components/navigation/header';
import styles from '../../../styles/pages/Clients.module.scss';
import TableAgent from './TableAgent';
import { api } from '@/api/api';

function ClientsContent(): JSX.Element {

  const [dataResponse, setdataResponse] = useState<any[] | undefined>(undefined)
  const [headersResponse, setHeadersResponse] = useState<string[] | undefined>(undefined)


  const handleGetPropmt = async () => {
    const { data: { data, headers } } = await api.post<{ data: any[], headers: string[] }>('/api/ai', {
      "prompt": "dame las ventas del mes anterior  y agrega una linea con la suma de la columnas Subtotal, Impuesto y Total"
    });
    setdataResponse(data)
    setHeadersResponse(headers)
  }


  useEffect(() => {
    handleGetPropmt()
  }, [])

  return (
    <div className={styles.page}>
      <Header title="Agente" dontShowBack />

      <TableAgent
        data={dataResponse || []}
        headers={headersResponse || []}
      />
    </div>
  );
}

export default function Clietns(): JSX.Element {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ClientsContent />
    </Suspense>
  );
}
