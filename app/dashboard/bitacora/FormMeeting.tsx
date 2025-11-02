import React, { useMemo } from 'react';
import Input from '@/components/Inputs/input';
import InputDatePicker from '@/components/Inputs/inputDate';
import InputTextBox from '@/components/Inputs/inputTextBox';
import TimeInput from '@/components/Inputs/inputTime';
import SelectReact from '@/components/Inputs/select';
import Modal from '@/components/Modals/Modal';
import { useFormMeeting } from "@/hooks/useFormMeeting";
import MeetingInterface from '@/interface/meeting';
import { optionTipoMeeting } from './FormMeetingData';
import styles from '../../../styles/Form.module.scss';

interface FormMeetingInterface {
  meetingProp?: MeetingInterface;
  visible: boolean;
  onClose: () => void;
  isEditing?: boolean;

  newPost?: () => void;
  onMeetingUpdated?: () => void;
  handleMeetingCreated?: () => void;

  clientData?: {
    name?: string,
    Id_Cliente?: number;
    Id_Almacen?: number;
    Fecha?: string | Date
  }
}

export default function FormMeeting({
  meetingProp,
  visible,
  onClose,
  isEditing,
  newPost,
  handleMeetingCreated,
  clientData
}: FormMeetingInterface): JSX.Element | null {

  const {
    clientActions,
    onSelectDocType,
    onChangeFormMeeting,
    meetingActions,
    clients,
    clientName,
    availableToPost,
    meetingForm
  } = useFormMeeting({
    onClose,
    newPost,
    handleMeetingCreated,
    isEditing,
    meetingProp,
    visible,
    clientData
  })

  const clientValue = useMemo(() => {
    return clientName ? {
      label: clientName,
      value: `${meetingForm.Id_Cliente}-${meetingForm.Id_Almacen}`,
    } : null;
  }, [clientName, meetingForm.Id_Cliente, meetingForm.Id_Almacen]);

  if (!visible || meetingForm.Fecha === '') return null;

  if (!clients) {
    return <div>Cargando clientes...</div>;
  }

  return (
    <Modal
      title="Crear Actividad"
      visible={visible}
      onClose={clientActions.onCloseModal}
      modalSize="medium"
      actionsBottom={{
        action1: {
          action: () => onClose(),
          label: 'Cancelar',
        },
        action2: {
          action: isEditing ? (): Promise<void> => meetingActions.onUpdatetMeeting() : (): Promise<void> => meetingActions.onPostMeeting(),
          label: isEditing ? 'Actualizar' : 'Crear Actividad',
          disabled: !availableToPost,
        },
      }}
    >
      <div className={styles.formMetting}>
        <SelectReact
          options={clients}
          name="Cliente"
          onChange={clientActions.onSearchClient}
          onSelect={clientActions.onSelectClient}
          onClear={clientActions.onClearClient}
          label="Selecciona el cliente"
          value={clientValue}
        />

        <SelectReact
          options={optionTipoMeeting}
          name="Tipo de contacto"
          onSelect={onSelectDocType}
          value={optionTipoMeeting.find((item) => item.value === meetingForm.TipoContacto) ?? null}
          label="Selecciona el tipo de actividad"
        />
    
        <Input
          value={meetingForm.Descripcion}
          name="Descripción"
          placeholder="Descripción de la reunión"
          onChange={(value) => onChangeFormMeeting('Descripcion', value)}
          label="Escribe una descripción de la actividad."
        />
    
        <InputDatePicker
          onChange={(value) => onChangeFormMeeting('Fecha', value ?? new Date().toISOString())}
          label="¿Cuándo será tu actividad?"
          value={meetingForm.Fecha}
        />

        <div>
          <label className='label'>¿A qué hora será tu actividad?</label>
          <div className={styles.hours}>
            <TimeInput
              onChange={(value) => onChangeFormMeeting('Hour', value)}
              label=""
              value={meetingForm.Hour || ''}
              placeholder="Inicio"
            />
            <TimeInput
              onChange={(value) => onChangeFormMeeting('HourEnd', value)}
              label=""
              value={meetingForm.HourEnd || ''}
              placeholder="Fin"
            />
        </div>
        </div>

        <InputTextBox
          placeholder="Comentarios de la reunión"
          value={meetingForm.Comentarios || ''}
          onChange={(value) => onChangeFormMeeting('Comentarios', value)}
          label="¿Algún comentario extra? Estos comentarios podrán ser editados después."
        />
      </div>
    </Modal>
  );
}
