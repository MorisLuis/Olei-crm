import { api } from '@/api/api';
import MeetingInterface from '@/interface/meeting';

interface getCalendarByMonthInterface {
  Anio: number;
  Mes: number;
}

export const getCalendarByMonth = async ({
  Anio,
  Mes
}: getCalendarByMonthInterface): Promise<{ tasks: MeetingInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ tasks: MeetingInterface[] }>(`/api/calendar/month?Anio=${Anio}&Mes=${Mes}`);
    return { tasks: data.tasks };
  } catch (error) {
    return { tasks: [], error };
  }
};

export const getCalendarTaskByDay = async (
  Day: string
): Promise<{ tasks: MeetingInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ tasks: MeetingInterface[] }>(`/api/calendar/day?Day=${Day}`);
    return { tasks: data.tasks };
  } catch (error) {
    return { tasks: [], error };
  }
};

interface getCalendarByMonthAndClientInterface {
  Anio: number;
  Mes: number;
  Id_Cliente: number;
}

export const getCalendarByMonthAndClient = async ({
  Anio,
  Mes,
  Id_Cliente,
}: getCalendarByMonthAndClientInterface): Promise<{ tasks: MeetingInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ tasks: MeetingInterface[] }>(`/api/calendar/monthAndClient?Anio=${Anio}&Mes=${Mes}&Id_Cliente=${Id_Cliente}`);
    return { tasks: data.tasks };
  } catch (error) {
    return { tasks: [], error };
  }
};
