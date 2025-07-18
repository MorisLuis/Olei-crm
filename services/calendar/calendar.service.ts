import { api } from '@/api/api';
import { GetCalendarByMonthAndClientParams, GetCalendarByMonthAndClientResponse, GetCalendarByMonthParams, GetCalendarByMonthResponse, GetCalendarTaskByDayParams, GetCalendarTaskByDayResponse } from './calendar.interface';

export const getCalendarByMonth = async (params: GetCalendarByMonthParams): Promise<GetCalendarByMonthResponse> => {

  const { data } = await api.get<GetCalendarByMonthResponse>(`/api/calendar/month`, {
    params: {
      ...params
    }
  });

  return { tasks: data.tasks };
};


export const getCalendarByMonthAndClient = async (params: GetCalendarByMonthAndClientParams): Promise<GetCalendarByMonthAndClientResponse> => {
  const { data } = await api.get<GetCalendarByMonthAndClientResponse>(`/api/calendar/monthAndClient`, {
    params: {
      ...params
    }
  });
  return { tasks: data.tasks };
};


export const getCalendarTaskByDay = async (params: GetCalendarTaskByDayParams): Promise<GetCalendarTaskByDayResponse> => {
  const { data } = await api.get<GetCalendarTaskByDayResponse>(`/api/calendar/day`, {
    params: {
      ...params
    }
  });
  return { tasks: data.tasks };
};
