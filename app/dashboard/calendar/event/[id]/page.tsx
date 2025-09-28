'use client';

import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import Header, { ActionsInterface } from '@/components/navigation/header';
import ClientAgendaContent from './ClientAgendaContent';
import { ExecuteNavigationEventClient } from './TimelineNavigationTemp';
import styles from '../../../../../styles/pages/Calendar.module.scss';

export default function ClientAgenda(): JSX.Element {

  const {
    navigateToBack,
    navigateBackFromModalSells,
    navigateToModalSells,
    openModalSells
  } = ExecuteNavigationEventClient();

  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [refreshTimeline, setRefreshTimeline] = useState(false)
  const searchParams = useSearchParams();
  const idCliente = searchParams.get('Id_Cliente');
  const idAlmacen = searchParams.get('Id_Almacen');
  const clientName = searchParams.get('clientName');

  const clientData = useMemo(() => {
    return (idCliente && idAlmacen && clientName) ? {
      Id_Cliente: Number(idCliente),
      Id_Almacen: Number(idAlmacen),
      name: clientName
    } : undefined
  }, [idCliente, idAlmacen, clientName])

  const onMeetingCreated = (): void => setRefreshTimeline(prev => !prev);
  const onCloseMeetingModal = (): void => setOpenModalCreateMeeting(false);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Nueva Actividad',
      onclick: () => setOpenModalCreateMeeting(true),
      color: 'yellow',
      notVsible: false
    },
  ];

  return (
    <div className={styles.timelinePage}>
      <Header
        title={clientName ? clientName : "Calendario"}
        actions={clientActions}
        custumBack={navigateToBack}
      />      

      <ClientAgendaContent
        idCliente={idCliente}
        refreshTimeline={refreshTimeline}
        openModalSells={openModalSells}
        navigateToModalSells={navigateToModalSells}
        navigateBackFromModalSells={navigateBackFromModalSells}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={onCloseMeetingModal}
        handleMeetingCreated={onMeetingCreated}
        clientData={{
          ...clientData,
          //Fecha: new Date(decodedDate)
        }}
      />
    </div>
  );
}
