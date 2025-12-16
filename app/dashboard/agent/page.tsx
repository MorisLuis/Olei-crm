'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import InputSearch from '@/components/Inputs/inputSearch';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Header from '@/components/navigation/header';
import { useEnterSubmit } from '@/hooks/dom/useEnterSubmit';
import { exportAgentData, getResponseAgent } from '@/services/agent';
import { getInformesIa } from '@/services/informes';
import TableAgent from './TableAgent';
import styles from '../../../styles/pages/Agente.module.scss';

interface InformesIa {
  categoriaId: number;
  categoriaNombre: string;
  informes: {
    Id_InformeIA: number;
    Descripcion: string;
    PeticionUsuario: string;
  }[];
}

function ClientsContent(): JSX.Element {

  const [propmtText, setPropmtText] = useState('')
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [dataResponse, setdataResponse] = useState<unknown[] | undefined>(undefined)
  const [queryId, setQueryId] = useState()
  const [headersResponse, setHeadersResponse] = useState<string[] | undefined>(undefined)
  const [informesIa, setInformesIa] = useState<InformesIa[]>()
  const [error, setError] = useState<string | undefined>(undefined)

  const handleGetInformes = async () => {
    try {
      const informes = await getInformesIa()
      setInformesIa(informes)
    } catch (error) {
      console.error('Error fetching informes IA:', error);
    }
  }

  const handleGetPropmt = async () => {
    try {
      setError(undefined)
      setLoadingResponse(true)
      const { data, headers, queryId } = await getResponseAgent(propmtText)
      setdataResponse(data)
      setHeadersResponse(headers)
      setQueryId(queryId)
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

  const onExportAgentRequest = async () => {
    try {
      if (!queryId) return
      const blob = await exportAgentData(queryId);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "reporte.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting agent data:', error);
    }
  }

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

  useEffect(() => {
    handleGetInformes()
  }, []);

  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div className={styles.agentePage}>

      <div className={styles.menu}>
        {informesIa?.map((informeCategoria) => {
          const isOpen = openCategories[informeCategoria.categoriaId];

          return (
            <div
              key={informeCategoria.categoriaId}
              className={styles.menuSection}
            >
              <button
                className={styles.menuHeader}
                onClick={() => toggleCategory(informeCategoria.categoriaId)}
                aria-expanded={isOpen}
              >
                <h3>{informeCategoria.categoriaNombre}</h3>
                <span className={isOpen ? styles.arrowOpen : styles.arrow} />
              </button>

              <ul className={isOpen ? styles.menuListOpen : styles.menuList}>
                {informeCategoria.informes.map((informe) => (
                  <li key={informe.Id_InformeIA} onClick={() => onTextPrompt(informe.PeticionUsuario)}>
                    <strong>{informe.Descripcion}</strong>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={styles.agentContent}>
        <Header title="Agente" dontShowBack />

        <div style={{ gap: 10, width: "80%", justifyContent: "center", display: "flex", marginBottom: 20 }}>
          <InputSearch onSearch={onTextPrompt} onCleanSearch={onCleanSearch} onKeyDown={handleKeyDown} valueDefault={propmtText}/>
          <Button text="Enviar" disabled={false} onClick={handleGetPropmt} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {renderTable()}

        {
          queryId &&
          <Button
            text="Exportar"
            disabled={!queryId}
            onClick={onExportAgentRequest}
          />
        }
      </div>
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
