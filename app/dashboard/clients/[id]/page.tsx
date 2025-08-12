'use client';

import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, {  useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import CalendarComponent from '@/app/dashboard/calendar/Calendar';
import SellDetails from '@/app/dashboard/sells/general/[id]/[sellId]/SellDetails';
import BriefCard from '@/components/Cards/BriefCard';
import { ClientActionsModal } from '@/components/Clients/ClientActionsModals';
import Modal from '@/components/Modals/Modal';
import Header from '@/components/navigation/header';
import { useClientActions } from '@/hooks/clients/useClientActions';
import { briefClientData } from './BriefClientData';
import ModalEditClient from './ModalEditClient';
import styles from '../../../../styles/pages/Clients.module.scss';
import { INITIAL_MEETING } from '../../bitacora/FormMeetingData';

export default function ClientDetailsPage(): JSX.Element {

  const { push } = useRouter();
  const [eventToOpen, setEventToOpen] = useState(INITIAL_MEETING);
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false)
  const [refreshClientTrigger, setRefreshClientTrigger] = useState(0)

  const params = useParams();
  const searchParams = useSearchParams();
  const idCliente = params.id;
  const idAlmacen = searchParams.get('Id_Almacen');
  const sellId = searchParams.get('sellId');

  const handleCloseMeetingModal = (): void => {
    setOpenModalCreateMeeting(false);
    setEventToOpen(INITIAL_MEETING);
  };

  const handleOnClickDay = (arg: DateClickArg): void => {
    push(`/dashboard/calendar/event/${arg.date}?Id_Cliente=${idCliente}&Id_Almacen=${idAlmacen}&clientName=${clientName}`);
  };

  const {
    clientData,
    loadingClientData,
    clientActions,
    openModalWhatsApp,
    openModalEmail,
    setOpenModalWhatsApp,
    setOpenModalEmail,
  } = useClientActions(Number(idCliente), refreshClientTrigger);

  const clientName = clientData ? clientData?.Nombre : null;

  return (
    <>
      <Header
        title={clientName}
        actions={clientActions}
        custumBack={() => push('/dashboard/clients')}
      />

      <div className={styles.clientDetails}>
        <div className={styles.clientDetails__brief}>
          <BriefCard
            data={clientData ? briefClientData(clientData) : null}
            header="Detalles de cliente"
            isLoading={loadingClientData}
            headerAction={() => setOpenModalEditUser(true)}
          />
        </div>
        <div className={styles.clientDetails__calendar}>
          <CalendarComponent
            onClickDay={handleOnClickDay}
            Id_Cliente={Number(idCliente)}
            clientVersion={true}
            isLoading={loadingClientData}
          />
        </div>
      </div>

      <ClientActionsModal
        openModalWhatsApp={openModalWhatsApp}
        openModalEmail={openModalEmail}
        phoneNumber={clientData?.TelefonoWhatsapp?.trim()}
        email={clientData?.CorreoVtas}
        onCloseWhatsApp={() => setOpenModalWhatsApp(false)}
        onCloseEmail={() => setOpenModalEmail(false)}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        meetingProp={eventToOpen}
        isEditing
      />

      <ModalEditClient
        visible={openModalEditUser}
        onClose={() => setOpenModalEditUser(false)}
        clientData={clientData}
        trigger={() => setRefreshClientTrigger(refreshClientTrigger + 1)}
      />

      <Modal
        visible={sellId ? true : false}
        title="Detalle de venta"
        onClose={() => push(`?Id_Almacen=${idAlmacen}`)}
        modalSize="medium"
      >
        <SellDetails />
      </Modal>
    </>
  );
}