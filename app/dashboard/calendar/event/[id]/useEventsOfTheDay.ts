import { useInfiniteQuery } from '@tanstack/react-query';
import { TimelineInterface } from '@/interface/calendar';
import { GetCalendarTaskByDayResponse } from '@/services/calendar/calendar.interface';
import { getCalendarTaskByDay } from '@/services/calendar/calendar.service';


interface useGetEventsOfTheDayResponse {
  eventsOfTheDay: TimelineInterface[] | null;
  isLoading: boolean;
  TotalBitacora: number;
  TotalVentas: number;
  isFetchingNextPage:boolean
  fetchNextPage: () => void
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
    isLoading,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery<GetCalendarTaskByDayResponse, Error>({
    queryKey: ['eventsOfTheDay', idCliente, decodedDate],
    queryFn: ({ pageParam = 1 }) =>
      getCalendarTaskByDay({
        Day: formattedDate,
        Id_Cliente: idCliente,
        PageNumber: pageParam as number,
        limit: 10
      }),
    getNextPageParam: (lastPage, allPages) => lastPage.tasks.length === 0 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    staleTime: 0
  });

  const items = data?.pages.flatMap(page => page.tasks) ?? [];
  const TotalBitacora = data?.pages[0]?.TotalBitacora ?? 0;
  const TotalVentas = data?.pages[0]?.TotalVentas ?? 0;

  return {
    eventsOfTheDay: items,
    isLoading,
    TotalBitacora,
    TotalVentas,
    isFetchingNextPage,
    fetchNextPage
  };
};
