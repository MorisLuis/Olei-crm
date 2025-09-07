import { api } from '@/api/api';
import MeetingInterface from '@/interface/meeting';
import { hourValidation } from '@/utils/validators/FormMeetingValidation';
import { getMeetingsInterface } from './meeting.interface';
import { dateValidation } from '@/utils/validators/dateValidation';


export const getMeetings = async (
  params: getMeetingsInterface
): Promise<{ meetings: MeetingInterface[], error?: true; message?: string; details?: string[], total: number }> => {

  const errors: string[] = [];
  const { filters } = params;

  if (filters.FilterCliente === 1 && !filters.Id_Cliente) {
    errors.push('Es necesario un Id_Cliente');
  }

  if (filters.FilterTipoContacto === 1 && !filters.TipoContacto) {
    errors.push('Es necesario un TipoContacto');
  }

  if (errors.length > 0) {
    return { meetings: [], error: true, message: 'Errores de validación', details: errors, total: 0 };
  }

  const { data } = await api.get<{ meetings: MeetingInterface[], total: number }>(`/api/meetings`, {
    params: {
      PageNumber: params.PageNumber,
      ...params.filters,
    }
  });

  return { meetings: data.meetings, total: data.total };
};


export const getMeetingById = async (id: string): Promise<{ meeting?: MeetingInterface }> => {
  const { data } = await api.get<{ meeting: MeetingInterface }>(`/api/meetings/${id}`);
  return { meeting: data.meeting };
};

export const postMeeting = async (bodyMeeting: MeetingInterface): Promise<any> => {
  try {
    // Validaciones
    const errors: string[] = [];

    if (!bodyMeeting.Id_Cliente) {
      errors.push('Es necesario el cliente');
    }

    if (!bodyMeeting.Id_Almacen) {
      errors.push('Es necesario el almacen');
    }

    if (!dateValidation(bodyMeeting.Fecha)) {
      errors.push('Fecha inválida.');
    }

    if (bodyMeeting.Hour && !hourValidation(bodyMeeting.Hour)) {
      errors.push('Hora inicial inválida.');
    }

    if (bodyMeeting.HourEnd && !hourValidation(bodyMeeting.HourEnd)) {
      errors.push('Hora final inválida.');
    }

    if (errors.length > 0) {
      return { error: true, message: 'Errores de validación', details: errors };
    };

    // Petición a la API
    const response = await api.post('/api/meetings', bodyMeeting);
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const updateMeeting = async (
  bodyMeeting: Partial<MeetingInterface>,
  Id_Bitacora: number
): Promise<any> => {
  try {
    // Validaciones
    const errors: string[] = [];

    if (bodyMeeting.Fecha && !dateValidation(bodyMeeting.Fecha)) {
      errors.push('Fecha inválida.');
    }

    if (bodyMeeting.Hour && !hourValidation(bodyMeeting.Hour)) {
      errors.push('Hora inicial inválida.');
    }

    if (bodyMeeting.HourEnd && !hourValidation(bodyMeeting.HourEnd)) {
      errors.push('Hora final inválida.');
    }

    if (errors.length > 0) {
      return { error: true, message: 'Errores de validación', details: errors };
    }

    // Petición a la API
    const response = await api.put(`/api/meetings/${Id_Bitacora}`, bodyMeeting);
    return response.data.result;
  } catch (error) {
    return { error: error };
  }
};
