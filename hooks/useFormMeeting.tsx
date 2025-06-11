/* 
 * Custom hook to manage the state and logic for creating and updating meetings (actividades).
 * Handles form state, client selection/searching, posting/updating data, and side effects like toast messages.
*/

import { OptionType } from "@/components/Inputs/select";
import { ClientInterface } from "@/interface/client";
import MeetingInterface from "@/interface/meeting";
import { postMeeting, updateMeeting } from "@/services/bitacora/meeting.service";
import { getClientById, searchClients } from "@/services/clients/clients.service";
import { getActualHour, getCorrectDate } from "@/utils/format/formatTime";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import useToast from "./useToast";


const INITIAL_MEETING: MeetingInterface = {
    Nombre: '',
    Fecha: '',
    Hour: '',
    HourEnd: '',
    Descripcion: '',
    TipoContacto: 0,
    Comentarios: '',
    Id_Bitacora: 0,
    Id_Cliente: 0,
    Id_Almacen: 0
};

interface useFormMeetingResponse {

    clientActions: {
        onSelectClient: (option: OptionType) => Promise<void>;
        onSearchClient: (value: string) => void;
        onClearClient: () => void;
        onCloseModal: () => void;
    },
    meetingActions: {
        resetMeeting: (meetingProp: MeetingInterface) => Promise<void>;
        onPostMeeting: () => Promise<void>;
        onUpdatetMeeting: () => Promise<void>;
    },

    onSelectDocType: (option: OptionType) => Promise<void>;
    onChangeFormMeeting: <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]) => void;
    clients?: OptionType[],
    clientName: string | null,
    availableToPost: boolean;
    meetingForm: MeetingInterface

};

interface useFormMeetingInterface {
    onClose: () => void;
    newPost?: () => void;
    handleMeetingCreated?: () => void;
    onMeetingUpdated?: () => void;
    isEditing?: boolean;
    meetingProp?: MeetingInterface;
    visible: boolean;

    clientData?: {
        name: string,
        Id_Cliente: number;
        Id_Almacen: number;
    }
}

export const useFormMeeting = ({
    onClose,
    newPost,
    handleMeetingCreated,
    onMeetingUpdated,
    isEditing,
    meetingProp,
    visible,
    clientData
}: useFormMeetingInterface): useFormMeetingResponse => {

    const { showSuccess, showInfo } = useToast();
    const [clientName, setClientName] = useState<string | null>(null)
    const [meetingForm, setMeetingForm] = useState<MeetingInterface>(INITIAL_MEETING);
    const [clientsDataRaw, setClientsDataRaw] = useState<ClientInterface[]>();
    const availableToPost: boolean = !!meetingForm?.TipoContacto && !!meetingForm?.Id_Cliente;

    const onChangeFormMeeting = <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]): void => {
        setMeetingForm((prev) => ({ ...prev, [key]: value }));
    };

    const onSelectClient = async (option: OptionType): Promise<void> => {
        if (option === null) return
        const splitValue = option.value.toString().split('-');
        setClientName(option.label as string)
        onChangeFormMeeting('Id_Cliente', Number(splitValue[0] ?? 0));
        onChangeFormMeeting('Id_Almacen', Number(splitValue[1] ?? 0));
    };

    const onClearClient = (): void => {
        setClientName(null);
        onChangeFormMeeting('Id_Cliente', 0);
        onChangeFormMeeting('Id_Almacen', 0);
    };

    const debouncedSearchClients = useMemo(() =>
        debounce(async (value: string) => {
            const { clients } = await searchClients(value);
            setClientsDataRaw(clients);
        }, 500),
        [setClientsDataRaw]
    );

    const onSearchClient = useCallback((value: string) => {
        debouncedSearchClients(value);
    }, [debouncedSearchClients]);

    const clients: OptionType[] = (clientsDataRaw ?? [])?.map((item) => ({
        label: item.Nombre as string,
        value: `${item.Id_Cliente}-${item.Id_Almacen}` as string,
    }));

    const onCloseModal = () => {
        setMeetingForm(INITIAL_MEETING);
        onClose();
    };

    const onSelectDocType = async (option: OptionType): Promise<void> => {
        onChangeFormMeeting('TipoContacto', Number(option?.value ?? 0) as 0 | 1 | 2 | 3 )
    };

    const resetMeeting = async (meetingProp: MeetingInterface): Promise<void> => {
        const { Id_Cliente, Id_Almacen, Fecha } = meetingProp;

        if (Id_Cliente && Id_Almacen) {
            const { client } = await getClientById({ Id_Almacen, Id_Cliente });
            if (client?.Nombre) {
                setClientName(client?.Nombre?.trim())
            }
        } else {
            setClientName(null)
        };

        const adjustedDate = getCorrectDate(Fecha)
        const meetingData = {
            ...meetingProp,
            Fecha: adjustedDate
        };

        setMeetingForm(meetingData);
    };

    const onPostMeeting = async (): Promise<void> => {
        if (!availableToPost) {
            return showInfo('Es necesario agregar título, tipo de contacto y cliente');
        }

        const post = await postMeeting(meetingForm);
        onClose();
        newPost?.();

        if (post.error) {
            console.error(post.details);
            showInfo('Hubo un error, intentalo de nuevo');
            return;
        }

        handleMeetingCreated?.();
        showSuccess(
            isEditing ? `Actividad editada!` : `Actividad creada!`
        );
    };

    const onUpdatetMeeting = async (): Promise<void> => {
        if (!availableToPost) {
            return showInfo('Es necesario agregar título, tipo de contacto y cliente');
        }

        if (!meetingForm.Id_Bitacora) {
            return showInfo('Es necesario Id_Bitacora');
        }

        const post = await updateMeeting(meetingForm, meetingForm.Id_Bitacora);
        onClose();
        newPost?.();

        if (post.error) {
            console.error(post.details);
            showInfo('Hubo un error, intentalo de nuevo');
            return;
        }

        onMeetingUpdated?.();
        showSuccess(
            isEditing ? `Actividad editada!` : `Actividad creada!`
        );
    };

    // Efecto: Cuando el modal se abre, si hay datos, se carga la info. Si no, se setea hora por default.
    useEffect(() => {
        if (!visible) return;

        if (meetingProp?.TipoContacto) {
            resetMeeting(meetingProp);
        } else {
            const { hour, hourEnd } = getActualHour()
            setMeetingForm(prevMeeting => ({
                ...prevMeeting,
                Fecha: new Date().toISOString(),
                Hour: hour,
                HourEnd: hourEnd,
            }));
        };

        if(clientData) {
            setMeetingForm(prevMeeting => ({
                ...prevMeeting,
                Id_Almacen: clientData.Id_Almacen,
                Id_Cliente: clientData.Id_Cliente
            }));

            setClientName(clientData.name)
        };

    }, [visible, meetingProp, clientData]);

    useEffect(() => {
        if (!visible) return;
        onSearchClient('');
    }, [meetingProp, onSearchClient, visible]);


    return {
        clientActions: {
            onSelectClient,
            onClearClient,
            onSearchClient,
            onCloseModal
        },
        meetingActions: {
            resetMeeting,
            onPostMeeting,
            onUpdatetMeeting
        },

        clientName,
        clients,
        availableToPost,
        onSelectDocType,
        onChangeFormMeeting,
        meetingForm
    }

}