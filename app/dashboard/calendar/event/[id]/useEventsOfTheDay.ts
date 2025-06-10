import { useCallback, useEffect, useState } from 'react';
import { TimelineInterface } from '@/interface/calendar';
import { getCalendarTaskByDay } from '@/services/calendar';


interface useGetEventsOfTheDayResponse {
  eventsOfTheDay: TimelineInterface[] | null;
  isLoading: boolean;
}

export const useGetEventsOfTheDay = (
  decodedDate: string,
  idCliente: string | null,
  refreshTimeline?: boolean
): useGetEventsOfTheDayResponse => {

  const [eventsOfTheDay, setEventsOfTheDay] = useState<TimelineInterface[] | null>(null);

  const isLoading = eventsOfTheDay === null;

  const fetchEvents = useCallback(async (): Promise<void> => {
    const date = new Date(decodedDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const { tasks } = await getCalendarTaskByDay(formattedDate, idCliente);
    setEventsOfTheDay(tasks);
  }, [decodedDate, idCliente])

  useEffect(() => {
    fetchEvents();
  }, [decodedDate, fetchEvents, refreshTimeline]);

  return {
    eventsOfTheDay,
    isLoading
  };
};
