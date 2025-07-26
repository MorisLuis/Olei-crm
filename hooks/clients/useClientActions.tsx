// hooks/useClientActions.ts
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ActionsInterface } from '@/components/navigation/header';
import { ClientInterface } from '@/interface/client';
import { getClientById } from '@/services/clients/clients.service';

export const useClientActions = (idCliente: number) => {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const idAlmacen = searchParams.get('Id_Almacen');

    const [openModalWhatsApp, setOpenModalWhatsApp] = useState(false);
    const [openModalEmail, setOpenModalEmail] = useState(false);
    const [clientData, setClientData] = useState<ClientInterface>();
    const [loadingClientData, setLoadingClientData] = useState(true);


    const handleGetClientData = useCallback(async () => {
        if (!idCliente || !idAlmacen) return;
        //if (typeof idCliente !== 'string') return;
        //if (typeof idAlmacen !== 'string') return;
        setLoadingClientData(true);
        const { client } = await getClientById({ Id_Cliente: idCliente, Id_Almacen: idAlmacen });
        setClientData(client);
        setLoadingClientData(false);
    }, [idCliente, idAlmacen]);

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

    return {
        clientData,
        loadingClientData,
        clientActions,
        openModalWhatsApp,
        openModalEmail,
        setOpenModalWhatsApp,
        setOpenModalEmail,
    };
};
