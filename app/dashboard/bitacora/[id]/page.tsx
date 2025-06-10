'use client';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import BriefCard from '@/components/Cards/BriefCard';
import { MessageCard } from '@/components/Cards/MessageCard';
import Header from '@/components/navigation/header';
import { ClientInterface } from '@/interface/client';
import { getClientById } from '@/services/clients/clients.service';
import BitacoraDetailsTable from './BitacoraDetails';
import styles from '../../../../styles/pages/Bitacora.module.scss';
import { briefClientData } from '../../clients/[id]/BriefClientData';

export default function ClientDetailsPage(): JSX.Element {

  const pathname = usePathname();
  const Id_Bitacora = pathname.split('/').filter(Boolean)[2];
  const searchParams = useSearchParams();
  const idAlmacen = searchParams.get('Id_Almacen');
  const idClient = searchParams.get('Id_Cliente');
  const [clientData, setClientData] = useState<ClientInterface | null>();

  const handelGetClientData = useCallback(async () => {
    if (!idAlmacen || !idClient) return;
    const { client } = await getClientById({ Id_Almacen: idAlmacen, Id_Cliente: idClient });
    setClientData(client);
  }, [idAlmacen, idClient]);

  useEffect(() => {
    handelGetClientData();
  }, [handelGetClientData]);

  return (
    <>
      <Header title={clientData?.Nombre ?? 'Regresar'} />
      <div className={styles.bitacoraDetails}>
        <div className={styles.bitacoraDetails__brief}>
          {clientData ? (
            <BriefCard data={briefClientData(clientData)} header="Detalle de cliente" isLoading={false} />
          ) : (
            <MessageCard title="No hay infomacion del cliente" icon={faFaceFrown}>
              <p></p>
            </MessageCard>
          )}
        </div>
        <div className={styles.bitacoraDetails__data}>
          <div className={styles.details}>
            <h4>Actividad</h4>
            <BitacoraDetailsTable
              Id_Bitacora={Number(Id_Bitacora)}
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
