import { api } from '@/api/api';
import MeetingInterface, { FiltersMeetings } from '@/interface/meeting';
import { dateValidation, hourValidation } from '@/validations/FormMeetingValidation';

interface getMeetingsInterface {
  PageNumber: number;
  filters: FiltersMeetings;
}
export const getMeetings = async ({
  PageNumber,
  filters,
}: getMeetingsInterface): Promise<{ meetings: MeetingInterface[], error?: true; message?: string; details?: string[] }> => {
  try {
    const errors: string[] = [];

    if (filters.FilterCliente === 1 && !filters.Id_Cliente) {
      errors.push('Es necesario un Id_Cliente');
    }

    if (filters.FilterTipoContacto === 1 && !filters.TipoContacto) {
      errors.push('Es necesario un TipoContacto');
    }

    if (errors.length > 0) {
      return { meetings: [], error: true, message: 'Errores de validación', details: errors };
    }

    const { data } = await api.get<{ meetings: MeetingInterface[] }>(
      `/api/meetings?PageNumber=${PageNumber}&FilterTipoContacto=${filters.FilterTipoContacto}&FilterCliente=${filters.FilterCliente}&TipoContacto=${filters.TipoContacto}&Id_Cliente=${filters.Id_Cliente}&meetingOrderCondition=${filters.meetingOrderCondition}`
    );

    return { meetings: data.meetings };
  } catch (error) {
    return { meetings: [], error: true, message: 'Error en la petición', details: [String(error)] };
  }
};


interface getTotalMeetingsInterface {
  filters: FiltersMeetings;
}

export const getTotalMeetings = async ({
  filters
}: getTotalMeetingsInterface): Promise<{ total: number, error?: true; message?: string; details?: string[] }> => {
  try {
    const errors: string[] = [];

    if (filters.FilterCliente === 1 && !filters.Id_Cliente) {
      errors.push('Es necesario un Id_Cliente');
    }

    if (filters.FilterTipoContacto === 1 && !filters.TipoContacto) {
      errors.push('Es necesario un TipoContacto');
    }

    if (errors.length > 0) {
      return { total: 0, error: true, message: 'Errores de validación', details: errors };
    }

    const { data } = await api.get<{ total: number }>(
      `/api/meetings/total?FilterTipoContacto=${filters.FilterTipoContacto}&FilterCliente=${filters.FilterCliente}&TipoContacto=${filters.TipoContacto}&Id_Cliente=${filters.Id_Cliente}`
    );

    return { total: data.total };
  } catch (error) {
    return { total: 0, error: true, message: 'Error en la petición', details: [String(error)] };
  }
};

export const getMeetingById = async (id: string): Promise<{ meeting?: MeetingInterface, error?: true; message?: string; details?: string[] }> => {
  try {
    const { data } = await api.get<{ meeting: MeetingInterface }>(`/api/meetings/${id}`);
    return { meeting: data.meeting };
  } catch (error) {
    return { meeting: undefined, error: true, message: 'Error en la petición', details: [String(error)] };
  }
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
    }

    // Petición a la API
    const response = await api.post('/api/meetings', { body: bodyMeeting });
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
    const response = await api.put(`/api/meetings/${Id_Bitacora}`, { body: bodyMeeting });
    return response.data.result;
  } catch (error) {
    return { error: error };
  }
};
