'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import InputSearch from '@/components/Inputs/inputSearch';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Header from '@/components/navigation/header';
import { useEnterSubmit } from '@/hooks/dom/useEnterSubmit';
import { exportAgentData, getResponseAgent } from '@/services/agent';
import { getInformesIa } from '@/services/informes';
import InformeiaForm from './InformeiaForm';
import TableAgent from './TableAgent';
import styles from '../../../styles/pages/Agent.module.scss';

interface CategorizedInforms {
  categoriaId: number;
  categoriaNombre: string;
  informes: {
    Id_InformeIA: number;
    Descripcion: string;
    PeticionUsuario: string;
    Titulo: string;
  }[];
}

function ClientsContent(): JSX.Element {

  const [propmtText, setPropmtText] = useState('')
  const [queryId, setQueryId] = useState()
  const [dataResponse, setdataResponse] = useState<unknown[] | undefined>(undefined)
  const [headersResponse, setHeadersResponse] = useState<string[] | undefined>(undefined)
  const [categorizedInforms, setCategorizedInforms] = useState<CategorizedInforms[]>()
  const [lastPropmt, setLastPropmt] = useState<string | undefined>(undefined)

  const [loadingResponse, setLoadingResponse] = useState(false)
  const [openModalInformesia, setOpenModalInformesia] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
  const [mounted, setMounted] = useState(false);


  const handleGetInformes = async () => {
    try {
      const informes = await getInformesIa()
      setCategorizedInforms(informes)
    } catch (error) {
      console.error('Error fetching informes IA:', error);
    }
  }

  const handleGetPropmt = async () => {
    try {
      setError(undefined)
      setLoadingResponse(true)
      const { data, headers, queryId, prompt } = await getResponseAgent(propmtText)
      setdataResponse(data)
      setHeadersResponse(headers)
      setQueryId(queryId)
      setLastPropmt(prompt)
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

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  useEffect(() => {
    setMounted(true);
    handleGetInformes()
  }, []);

  if (!mounted) {
    return <div className={styles.agentPage}>Cargando...</div>;
  }
  return (
    <div className={styles.agentPage}>

      <div className={styles.menu}>
        {categorizedInforms?.map((informeCategoria) => {
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
                    <strong>{informe.Titulo.trim()}</strong>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={styles.agentContent}>
        <Header title="Agente" dontShowBack />

        <div className={styles.controls}>
          <InputSearch
            className={styles.inputSearch}
            onSearch={onTextPrompt}
            onCleanSearch={onCleanSearch}
            onKeyDown={handleKeyDown}
            valueDefault={propmtText}
          />
          <Button className={styles.button} text="Enviar" disabled={!propmtText} onClick={handleGetPropmt} />
          <Button className={styles.button} text="Guardar informe" disabled={!lastPropmt} onClick={() => setOpenModalInformesia(true)} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {renderTable()}

        <Button
          visible={!!dataResponse?.length && !!queryId}
          text="Exportar"
          disabled={!queryId}
          onClick={onExportAgentRequest}
        />
      </div>

      <InformeiaForm
        onClose={() => setOpenModalInformesia(false)}
        visible={openModalInformesia}
        queryId={queryId}
        prompt={lastPropmt || ''}
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
