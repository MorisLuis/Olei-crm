import { useInfiniteQuery } from '@tanstack/react-query';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { GetCalendarTaskByDayResponse } from '@/services/calendar/calendar.interface';
import { getCalendarTaskByDay } from '@/services/calendar/calendar.service';
import normalizeCalendarEventsByDay from './utils/normalizeCalendarEventsByDay';


interface useGetEventsOfTheDayResponse {
    eventsOfTheDay: TimelineMeetingInterface[] | null;
    isLoading: boolean;
    TotalBitacora: number;
    TotalVentas: number;
    isFetchingNextPage: boolean
    fetchNextPage: () => void
}


/**
 * @param {string} decodedDate - Date in string format, example: "Sat Sep 27 2025 00:00:00 GMT-0600 (Central Standard Time)" 
 * @param {string | null} idCliente
 * @param {boolean} [_refreshTimeline] 
 * @returns {useGetEventsOfTheDayResponse} 
 * @description Custom hook to fetch events of the day for a specific client using infinite scrolling.
 * @example  
 * const { 
 *    eventsOfTheDay,
 *    isLoading,
 *    TotalBitacora,
 *    TotalVentas,
 *    isFetchingNextPage,
 *    fetchNextPage
 * } = useGetEventsOfTheDay(decodedDate, idCliente, refreshTimeline);
 */

export const useGetEventsCalendarByDay = (
    decodedDate: Date | string,
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

    const items: TimelineInterface[] = data?.pages.flatMap(page => page.tasks) ?? [];
    const TotalBitacora = data?.pages[0]?.TotalBitacora ?? 0;
    const TotalVentas = data?.pages[0]?.TotalVentas ?? 0;
    const { events } = normalizeCalendarEventsByDay({ eventsOfTheDay: items });

    return {
        eventsOfTheDay: events,
        isLoading,
        TotalBitacora,
        TotalVentas,
        isFetchingNextPage,
        fetchNextPage
    };
};
