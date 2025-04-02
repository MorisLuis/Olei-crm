import { api } from '@/api/api';
import { CalendarInterface, TimelineInterface } from '@/interface/calendar';
import MeetingInterface from '@/interface/meeting';

interface getCalendarByMonthInterface {
  Anio: number;
  Mes: number;
}

export const getCalendarByMonth = async ({
  Anio,
  Mes
}: getCalendarByMonthInterface): Promise<{ tasks: CalendarInterface[] }> => {
  const { data } = await api.get<{ tasks: CalendarInterface[] }>(`/api/calendar/month?Anio=${Anio}&Mes=${Mes}`);
  return { tasks: data.tasks };
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
}: getCalendarByMonthAndClientInterface): Promise<{ tasks: CalendarInterface[] }> => {
  const { data } = await api.get<{ tasks: CalendarInterface[] }>(`/api/calendar/monthAndClient?Anio=${Anio}&Mes=${Mes}&Id_Cliente=${Id_Cliente}`);
  return { tasks: data.tasks };
};


export const getCalendarTaskByDay = async (
  Day: string
): Promise<{ tasks: TimelineInterface[] }> => {
  const { data } = await api.get<{ tasks: TimelineInterface[] }>(`/api/calendar/day?Day=${Day}`);
  return { tasks: data.tasks };
};
