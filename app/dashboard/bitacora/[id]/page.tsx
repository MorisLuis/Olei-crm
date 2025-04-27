'use client';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard';
import { MessageCard } from '@/components/Cards/MessageCard';
import FileUploader from '@/components/UI/FileUploader';
import Header from '@/components/navigation/header';
import { ClientInterface } from '@/interface/client';
import { getClientById } from '@/services/clients/clients.service';
import TableTertiaryBitacoraDetails from './TableTertiaryBitacoraDetails';
import styles from '../../../../styles/pages/Bitacora.module.scss';

export default function ClientDetailsPage(): JSX.Element {
  const pathname = usePathname();
  const Id_Bitacora = pathname.split('/').filter(Boolean)[2];
  const searchParams = useSearchParams();
  const idAlmacen = searchParams.get('Id_Almacen');
  const idClient = searchParams.get('Id_Cliente');
  const [clientData, setClientData] = useState<ClientInterface | null>();

  const briefData: briefDataInterface[] = [
    { id: 1, label: 'Nombre', value: `${clientData?.Nombre ?? ''}` },
    { id: 2, label: 'RazonSocial', value: `${clientData?.RazonSocial ?? 'N/A'}` },
    { id: 3, label: 'Telefono', value: `${clientData?.Telefono1 ?? 'N/A'}` },
    { id: 4, label: 'Correo', value: `${clientData?.CorreoVtas ?? 'N/A'}` },
  ];

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
        <div className={styles.bitacoraDetails__data}>
          <div className={styles.details}>
            <h4>Reunión</h4>
            <TableTertiaryBitacoraDetails Id_Bitacora={Number(Id_Bitacora)} />
          </div>
          <FileUploader />
        </div>
        <div className={styles.bitacoraDetails__brief}>
          {clientData ? (
            <BriefCard data={briefData} header="Detalle de cliente" isLoading={false} />
          ) : (
            <MessageCard title="No hay infomacion del cliente" icon={faFaceFrown}>
              <p></p>
            </MessageCard>
          )}
        </div>
      </div>
    </>
  );
}
