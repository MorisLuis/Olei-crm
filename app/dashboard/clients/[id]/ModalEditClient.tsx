import React, { useEffect, useState } from 'react'
import Input from '@/components/Inputs/input';
import Modal from '@/components/Modals/Modal';
import useToast from '@/hooks/useToast';
import { ClientInterface } from '@/interface/client';
import { updateClient } from '@/services/clients/clients.service';

interface ModalEditClientProps {
    visible: boolean;
    onClose: () => void;
    clientData?: ClientInterface;
    trigger?: () => void;
}

export interface ClientBody {
    Telefono1?: string;
    Telefono2?: string;
    TelefonoWhatsapp?: string;
    CorreoVtas?: string;
}


export default function ModalEditClient(params: ModalEditClientProps): JSX.Element | null {
    const { visible, onClose, clientData, trigger } = params;
    const [clientBody, setClientBody] = useState<ClientBody>()
    const [updatingClient, setUpdatingClient] = useState(false)
    const { showSuccess } = useToast();

    const disableUpdateAction = !clientBody ||
        ['Telefono1', 'Telefono2', 'TelefonoWhatsapp', 'CorreoVtas'].every(
            (key) => clientBody[key as keyof ClientBody] === clientData?.[key as keyof ClientBody]
        );

    const onEditClient = async (): Promise<void> => {
        const Id_Cliente = clientData?.Id_Cliente;
        const Id_Almacen = clientData?.Id_Almacen;

        if (!Id_Cliente || !Id_Almacen || !clientBody) return;
        try {
            setUpdatingClient(true)
            const client = await updateClient({ Id_Almacen, Id_Cliente, clientBody })
            trigger?.()
            showSuccess(`Cliente ${client.cliente.Nombre} has sido actualizado exitosamente!`);
            onClose()
        } catch (error) {
            console.error(error);
        } finally {
            setUpdatingClient(false)
        }
    };

    const onChangeFormMeeting = <K extends keyof ClientBody>(key: K, value: ClientBody[K]): void => {
        setClientBody((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        setClientBody({
            TelefonoWhatsapp: clientData?.TelefonoWhatsapp,
            Telefono1: clientData?.Telefono1,
            Telefono2: clientData?.Telefono2,
            CorreoVtas: clientData?.CorreoVtas
        })
    }, [clientData])

    return visible ? (
        <Modal
            title="Editar cliente"
            visible={visible}
            onClose={onClose}

            modalSize="medium"
            finalHeight="content"
            actionsBottom={{
                action1: {
                    action: () => onClose(),
                    label: 'Cancelar',
                },
                action2: {
                    action: onEditClient,
                    label: updatingClient ? 'Actualizando...' : 'Actualizar',
                    disabled: disableUpdateAction,
                },
            }}
        >
            <Input
                value={clientBody?.CorreoVtas ?? ''}
                type='text'
                name="Correo"
                placeholder="Escribe el correo"
                label="Cambia el correo del cliente."
                onChange={(value) => onChangeFormMeeting('CorreoVtas', value)}
            />

            <Input
                value={clientBody?.Telefono1 ?? ''}
                type='text'
                name="Telefono"
                placeholder="Escribe el telefono"
                label="Cambia el telefono del cliente."
                onChange={(value) => onChangeFormMeeting('Telefono1', value)}
            />

            <Input
                value={clientBody?.Telefono2 ?? ''}
                type='text'
                name="Telefono 2"
                placeholder="Escribe el telefono"
                label="Cambia el telefono 2 del cliente."
                onChange={(value) => onChangeFormMeeting('Telefono2', value)}
            />

            <Input
                value={clientBody?.TelefonoWhatsapp ?? ''}
                type='text'
                name="Telefono de Whatsapp"
                placeholder="Escribe el telefono"
                label="Cambia el telefono de Whatsapp del cliente."
                onChange={(value) => onChangeFormMeeting('TelefonoWhatsapp', value)}
            />
        </Modal>
    ) : null
}
