import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Input from '@/components/Inputs/input';
import InputDatePicker from '@/components/Inputs/inputDate';
import InputTextBox from '@/components/Inputs/inputTextBox';
import TimeInput from '@/components/Inputs/inputTime';
import SelectReact, { OptionType } from '@/components/Inputs/select';
import Modal from '@/components/Modals/Modal';
import useToast from '@/hooks/useToast';
import { useWindowSize } from '@/hooks/useWindowSize';
import { ClientInterface } from '@/interface/client';
import MeetingInterface from '@/interface/meeting';
import { getClientById, searchClients } from '@/services/clients/clients.service';
import { postMeeting, updateMeeting } from '@/services/meeting';
import { getActualHour, getCorrectDate } from "@/utils/formatTime";
import styles from '../../../styles/Form.module.scss';

export const INITIAL_MEETING: MeetingInterface = {
  Fecha: '',
  Hour: '',
  HourEnd: '',
  Descripcion: '',
  Titulo: '',
  TipoContacto: 0,
  Comentarios: '',
  Id_Bitacora: 0,
  Id_Cliente: 0,
  Id_Almacen: 0
};

interface FormMeetingInterface {
  meetingProp?: MeetingInterface;
  visible: boolean;
  onClose: () => void;
  isEditing?: boolean;

  newPost?: () => void;
  onMeetingUpdated?: () => void;
  handleMeetingCreated?: () => void;
}

export default function FormMeeting({
  meetingProp,
  visible,
  onClose,
  isEditing,
  newPost,
  onMeetingUpdated,
  handleMeetingCreated
}: FormMeetingInterface): JSX.Element | null {

  const { showSuccess, showInfo } = useToast();
  const { isMobile } = useWindowSize();

  // Inicialización del formulario
  const [meetingForm, setMeetingForm] = useState<MeetingInterface>(INITIAL_MEETING);
  const [clients, setClients] = useState<ClientInterface[]>();
  const [clienteLocal, setClienteLocal] = useState<string | null>(null)

  const availableToPost: boolean =
    !!meetingForm?.Titulo && !!meetingForm?.TipoContacto && !!meetingForm?.Id_Cliente;

  const optionTipoMeeting: OptionType[] = [
    { value: 1, label: 'Reunión' },
    { value: 2, label: 'Llamada' },
    { value: 3, label: 'Cita' },
    { value: 4, label: 'Tarea' },
  ];

  // Manejo genérico de cambios
  const handleChange = <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]): void => {
    setMeetingForm((prev) => ({ ...prev, [key]: value }));
  };

  // Client.
  const debouncedSearchClient = useMemo(
    () =>
      debounce(async (value: string): Promise<void> => {
        const { clients } = await searchClients(value);
        setClients(clients);
      }, 500), [setClients]
  );

  const onSearchClient = useCallback((value: string): void => {
    debouncedSearchClient(value);
  }, [debouncedSearchClient]);



  const onSelectClient = async (option: OptionType): Promise<void> => {
    if (option === null) return
    const splitValue = option.value.toString().split('-');
    setClienteLocal(option.label as string)
    handleChange('Id_Cliente', Number(splitValue[0] ?? 0));
    handleChange('Id_Almacen', Number(splitValue[1] ?? 0));
  };

  const onClearClient = (): void => {
    setClienteLocal(null);
    handleChange('Id_Cliente', 0);
    handleChange('Id_Almacen', 0);
  }

  // Doc type.
  const onSelectDocType = async (option: OptionType): Promise<void> => {
    handleChange('TipoContacto', Number(option?.value ?? 0) as 0 | 1 | 2 | 3 | 4)
  }

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
      isEditing ? `Reunión ${meetingForm.Titulo} editada!` : `Reunión ${meetingForm.Titulo} creada!`
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
      isEditing ? `Reunión ${meetingForm.Titulo} editada!` : `Reunión ${meetingForm.Titulo} creada!`
    );
  };

  const handleResetMeeting = async (meetingProp: MeetingInterface): Promise<void> => {
    const { Id_Cliente, Id_Almacen, Fecha } = meetingProp;

    if (Id_Cliente && Id_Almacen) {
      const { client } = await getClientById({ Id_Almacen, Id_Cliente });
      if (client?.Nombre) {
        setClienteLocal(client?.Nombre?.trim())
      }
    } else {
      setClienteLocal(null)
    }
    const adjustedDate = getCorrectDate(Fecha)
    const meetingData = {
      ...meetingProp,
      Fecha: adjustedDate
    };

    setMeetingForm(meetingData);
  };

  useEffect(() => {
    if (!visible) return;

    if (meetingProp?.Titulo) {
      handleResetMeeting(meetingProp);
    } else {
      const { hour, hourEnd } = getActualHour()
      setMeetingForm(prevMeeting => ({
        ...prevMeeting,
        Fecha: new Date(),
        Hour: hour,
        HourEnd: hourEnd,
      }));
    }
  }, [visible, meetingProp]);

  useEffect(() => {
    if (!visible) return;
    onSearchClient('');
  }, [meetingProp, onSearchClient, visible]);

  if (!visible || meetingForm.Fecha === '') return null;

  if (!clients) {
    return <div>Cargando clientes...</div>;
  }

  const optionsClients: OptionType[] = clients?.map((item) => ({
    label: item.Nombre as string,
    value: `${item.Id_Cliente}-${item.Id_Almacen}` as string,
  }));


  return (
    <Modal
      title="Crear Reunión"
      visible={visible}
      onClose={() => {
        setMeetingForm(INITIAL_MEETING)
        onClose()
      }}
      modalSize="medium"
      actionsBottom={{
        action1: {
          action: () => onClose(),
          label: 'Cancelar',
        },
        action2: {
          action: isEditing ? (): Promise<void> => onUpdatetMeeting() : (): Promise<void> => onPostMeeting(),
          label: isEditing ? 'Editar' : 'Crear reunión',
          disabled: !availableToPost,
        },
      }}
      extraStyles={{ width: isMobile ? '100%' : '40%' }}
    >
      <div className={styles.formMetting}>
        <SelectReact
          options={optionsClients}
          name="Cliente"
          onChange={onSearchClient}
          onSelect={onSelectClient}
          onClear={onClearClient}
          label="Selecciona el cliente"
          value={clienteLocal ? {
            label: clienteLocal,
            value: `${meetingForm.Id_Cliente}-${meetingForm.Id_Almacen}`
          } : null}
        />

        <SelectReact
          options={optionTipoMeeting}
          name="Tipo de contacto"
          onSelect={onSelectDocType}
          value={optionTipoMeeting.find((item) => item.value === meetingForm.TipoContacto) ?? null}
          label="Selecciona el tipo de tarea"
        />
        <Input
          value={meetingForm.Titulo}
          name="Titulo"
          placeholder="Título de la reunión"
          onChange={(value) => handleChange('Titulo', value)}
          label="Escribe un título para la tarea."
        />
        <Input
          value={meetingForm.Descripcion}
          name="Descripción"
          placeholder="Descripción de la reunión"
          onChange={(value) => handleChange('Descripcion', value)}
          label="Escribe una descripción de la tarea."
        />
        <InputDatePicker
          onChange={(value) => handleChange('Fecha', value ?? new Date())}
          label="¿Cuándo será tu tarea?"
          value={meetingForm.Fecha}
        />
        <div className={styles.hours}>
          <TimeInput
            onChange={(value) => handleChange('Hour', value)}
            label="¿A qué hora será tu tarea?"
            value={meetingForm.Hour || ''}
            placeholder="Inicio"
          />
          <TimeInput
            onChange={(value) => handleChange('HourEnd', value)}
            label="."
            value={meetingForm.HourEnd || ''}
            placeholder="Fin"
          />
        </div>

        <InputTextBox
          placeholder="Comentarios de la reunión"
          value={meetingForm.Comentarios || ''}
          onChange={(value) => handleChange('Comentarios', value)}
          label="¿Algún comentario extra? Estos comentarios podrán ser editados después."
        />

        {/* <FileUploader label="¿Deseas adjuntar algún archivo?" /> */}
      </div>
    </Modal>
  );
}
