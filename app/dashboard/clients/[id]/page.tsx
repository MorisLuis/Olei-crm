'use client';

import { DateClickArg } from '@fullcalendar/interaction/index.js';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import FormMeeting from '@/app/dashboard/bitacora/FormMeeting';
import CalendarComponent from '@/app/dashboard/calendar/Calendar';
import SellDetails from '@/app/dashboard/sells/general/[id]/[sellId]/SellDetails';
import BriefCard from '@/components/Cards/BriefCard';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { ClientInterface } from '@/interface/client';
import { getClientById } from '@/services/clients/clients.service';
import { briefClientData } from './BriefClientData';
import EmailModal from './ModalEmail';
import WhatsAppModal from './ModalWhatsApp';
import styles from '../../../../styles/pages/Clients.module.scss';
import { INITIAL_MEETING } from '../../bitacora/FormMeetingData';

export default function ClientDetailsPage(): JSX.Element {
  const { push } = useRouter();
  const [clientData, setClientData] = useState<ClientInterface>();
  const [loadingClientData, setLoadingClientData] = useState(true);

  const [openModalWhatsApp, setOpenModalWhatsApp] = useState(true);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [eventToOpen, setEventToOpen] = useState(INITIAL_MEETING);
  const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const idCliente = params.id;
  const idAlmacen = searchParams.get('Id_Almacen');
  const clientName = clientData ? clientData?.Nombre : null;
  const sellId = searchParams.get('sellId');

  const handleGetClientData = useCallback(async () => {
    if (!idCliente || !idAlmacen) return;
    if (typeof idCliente !== 'string') return;
    if (typeof idAlmacen !== 'string') return;
    setLoadingClientData(true);
    const { client } = await getClientById({ Id_Cliente: idCliente, Id_Almacen: idAlmacen });
    setClientData(client);
    setLoadingClientData(false);
  }, [idCliente, idAlmacen]);

  const handleCloseMeetingModal = (): void => {
    setOpenModalCreateMeeting(false);
    setEventToOpen(INITIAL_MEETING);
  };

  const handleOnClickDay = (arg: DateClickArg): void => {
    push(`/dashboard/calendar/event/${arg.date}?Id_Cliente=${idCliente}&Id_Almacen=${idAlmacen}&clientName=${clientName}`);
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Whatsapp',
      onclick: () => setOpenModalWhatsApp(true),
      notVsible: !clientData?.TelefonoWhatsapp?.trim(),
    },
    {
      id: 2,
      text: 'Correo',
      onclick: () => setOpenModalEmail(true),
      notVsible: !clientData?.CorreoVtas,
    },
    {
      id: 3,
      text: 'Ventas',
      onclick: () =>
        push(`/dashboard/sells/general/${clientData?.Id_Cliente}?client=${clientData?.Nombre}`),
      notVsible: !clientData?.Id_Cliente,
    },
    {
      id: 4,
      text: 'Cobranza',
      onclick: () =>
        push(
          `/dashboard/cobranza/${clientData?.Id_Cliente}?client=${clientData?.Nombre?.trim()}&Id_Almacen=${idAlmacen}&email=${clientData?.CorreoVtas?.trim()}`
        ),
      notVsible: !clientData?.Id_Cliente,
    },
  ];

  useEffect(() => {
    if (!idCliente || !idAlmacen) return;
    handleGetClientData();
  }, [idCliente, idAlmacen, handleGetClientData]);

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

      <WhatsAppModal
        visible={openModalWhatsApp}
        onClose={() => setOpenModalWhatsApp(false)}
        phoneNumber={clientData?.TelefonoWhatsapp?.trim()}
      />

      <EmailModal
        visible={openModalEmail}
        onClose={() => setOpenModalEmail(false)}
        email={clientData?.CorreoVtas}
      />

      <FormMeeting
        visible={openModalCreateMeeting}
        onClose={handleCloseMeetingModal}
        meetingProp={eventToOpen}
        isEditing
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