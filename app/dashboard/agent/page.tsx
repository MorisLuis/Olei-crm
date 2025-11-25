'use client';

import React, { Suspense, useState } from 'react';
import Button from '@/components/Buttons/Button';
import InputSearch from '@/components/Inputs/inputSearch';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Header from '@/components/navigation/header';
import { useEnterSubmit } from '@/hooks/dom/useEnterSubmit';
import { getResponseAgent } from '@/services/agent';
import TableAgent from './TableAgent';
import styles from '../../../styles/pages/Clients.module.scss';

function ClientsContent(): JSX.Element {

  const [propmtText, setPropmtText] = useState('')
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [dataResponse, setdataResponse] = useState<unknown[] | undefined>(undefined)
  const [headersResponse, setHeadersResponse] = useState<string[] | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)



  const handleGetPropmt = async () => {
    try {
      setError(undefined)
      setLoadingResponse(true)
      const { data, headers } = await getResponseAgent(propmtText)
      setdataResponse(data)
      setHeadersResponse(headers)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: { message?: string } } } }
      const errorMessage =
        err.response?.data?.error?.message ?? 'Error al obtener la respuesta del agente'

      setError(errorMessage)
      setdataResponse(undefined)
    }
    finally {
      setLoadingResponse(false)
    }
  }

  const handleKeyDown = useEnterSubmit(() => {
    handleGetPropmt()
  });


  const onTextPrompt = (text: string) => {
    setPropmtText(text)
  }

  const onCleanSearch = () => {
    setPropmtText('')
  }

  const renderTable = () => {

    if (loadingResponse) {
      return (
        <TableSkeleton
          columns={5}
          rows={30}
        />
      )
    }

    if (!dataResponse || !headersResponse) {
      return null
    }

    return (
      <TableAgent
        data={dataResponse || []}
        headers={headersResponse || []}
      />
    )
  }

  return (
    <div className={styles.page}>
      <Header title="Agente" dontShowBack />

      <div style={{ gap: 10, width: "80%", justifyContent: "center", display: "flex", marginBottom: 20 }}>
        <InputSearch onSearch={onTextPrompt} onCleanSearch={onCleanSearch} onKeyDown={handleKeyDown} />
        <Button text="Enviar" disabled={false} onClick={handleGetPropmt} />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {renderTable()}
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
