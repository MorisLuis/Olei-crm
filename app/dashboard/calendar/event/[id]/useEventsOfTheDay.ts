import { useInfiniteQuery } from '@tanstack/react-query';
import { TimelineInterface } from '@/interface/calendar';
import { getCalendarTaskByDay } from '@/services/calendar/calendar.service';


interface useGetEventsOfTheDayResponse {
  eventsOfTheDay: TimelineInterface[] | null;
  isLoading: boolean;
}

export const useGetEventsOfTheDay = (
  decodedDate: string,
  idCliente: string | null,
  _refreshTimeline?: boolean
): useGetEventsOfTheDayResponse => {

  const date = new Date(decodedDate);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const {
    data,
    isLoading
  } = useInfiniteQuery<{ tasks: TimelineInterface[] }, Error>({
    queryKey: ['eventsOfTheDay', idCliente, decodedDate],
    queryFn: ({ pageParam = 1 }) =>
      getCalendarTaskByDay({
        Day: formattedDate,
        Id_Cliente: idCliente,
        page: pageParam as number
      }),
    getNextPageParam: (lastPage, allPages) => lastPage.tasks.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 0
  });

  const items = data?.pages.flatMap(page => page.tasks) ?? [];

  return {
    eventsOfTheDay: items,
    isLoading
  };
};
