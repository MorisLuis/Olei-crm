import { useCallback, useEffect, useState } from 'react';
import { TimelineInterface } from '@/interface/calendar';
import { getCalendarTaskByDay } from '@/services/calendar';

export const useEventsOfTheDay = (decodedDate: string): TimelineInterface[] | null => {
  const [eventsOfTheDay, setEventsOfTheDay] = useState<TimelineInterface[] | null>(null);

  const fetchEvents = useCallback(async (): Promise<void> => {
    const date = new Date(decodedDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const { tasks } = await getCalendarTaskByDay(formattedDate);
    setEventsOfTheDay(tasks);
  }, [decodedDate])

  useEffect(() => {
    fetchEvents();
  }, [decodedDate, fetchEvents]);

  return eventsOfTheDay;
};
