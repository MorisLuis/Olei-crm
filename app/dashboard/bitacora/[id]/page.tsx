'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BriefCard from '@/components/Cards/BriefCard';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { ClientInterface } from '@/interface/client';
import { getClientById } from '@/services/clients/clients.service';
import BitacoraDetailsTable from './BitacoraDetails';
import styles from '../../../../styles/pages/Bitacora.module.scss';
import { briefClientData } from '../../clients/[id]/BriefClientData';
import FormMeeting from '../FormMeeting';

export default function ClientDetailsPage(): JSX.Element {

  const pathname = usePathname();
  const Id_Bitacora = pathname.split('/').filter(Boolean)[2];
  const searchParams = useSearchParams();
  const idAlmacen = searchParams.get('Id_Almacen');
  const idClient = searchParams.get('Id_Cliente');

  const [clientData, setClientData] = useState<ClientInterface | null>();
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [loadingClientData, setLoadingClientData] = useState(true);

  const handelGetClientData = useCallback(async () => {
    if (!idAlmacen || !idClient) return;
    setLoadingClientData(true)
    const { client } = await getClientById({ Id_Almacen: idAlmacen, Id_Cliente: idClient });
    setClientData(client);
    setLoadingClientData(false)
  }, [idAlmacen, idClient]);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
      notVsible: loadingClientData
    }
  ];

  const clientDataForm = useMemo(() => {
    return (clientData?.Id_Cliente && clientData?.Id_Almacen && clientData?.Nombre) ? {
      Id_Cliente: Number(clientData?.Id_Cliente),
      Id_Almacen: Number(clientData.Id_Almacen),
      name: clientData.Nombre
    } : undefined
  }, [clientData])

  useEffect(() => {
    handelGetClientData();
  }, [handelGetClientData]);

  return (
    <>
      <Header
        title={clientData?.Nombre ?? 'Regresar'}
        actions={clientActions}
        isLoading={loadingClientData}
      />

      <div className={styles.bitacoraDetails}>
        <div className={styles.bitacoraDetails__brief}>
          <BriefCard
            data={clientData ? briefClientData(clientData) : null}
            header="Detalle de cliente"
            isLoading={loadingClientData}
          />
        </div>

        <div className={styles.bitacoraDetails__data}>
          <div className={styles.details}>
            <h4>Actividad</h4>
            <BitacoraDetailsTable
              Id_Bitacora={Number(Id_Bitacora ?? 0)}
              isLoading={!Id_Bitacora}
            />
          </div>
        </div>
      </div>

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={() => setOpenModalCreateMeeting(false)}
        clientData={clientDataForm}
      />
    </>
  );
}
