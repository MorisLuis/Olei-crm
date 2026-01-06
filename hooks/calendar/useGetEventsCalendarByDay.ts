import { useInfiniteQuery } from '@tanstack/react-query';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { GetCalendarTaskByDayResponse } from '@/services/calendar/calendar.interface';
import { getCalendarTaskByDay } from '@/services/calendar/calendar.service';
import normalizeCalendarEventsByDay from './utils/normalizeCalendarEventsByDay';
import { useCallback, useEffect } from 'react';
import { useMeetingEvents } from '@/context/Meetings/MeetingsContext';


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
 * @param {boolean} [refreshTimeline] 
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
): useGetEventsOfTheDayResponse => {

    const date = new Date(decodedDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const { event, clear } = useMeetingEvents();

    const fetchTasks = useCallback(
        async (pageParam: number): Promise<GetCalendarTaskByDayResponse> => {
            return getCalendarTaskByDay({
                Day: formattedDate,
                Id_Cliente: idCliente,
                PageNumber: pageParam,
                limit: 10,
            });
        },
        [formattedDate, idCliente]
    );

    const useDynamicQuery = useCallback(() => {
        return useInfiniteQuery<GetCalendarTaskByDayResponse, Error>({
            queryKey: ["eventsOfTheDay", idCliente, formattedDate],
            queryFn: ({ pageParam = 1 }) => fetchTasks(pageParam as number),
            getNextPageParam: (lastPage, allPages) =>
                lastPage.tasks.length === 0 ? undefined : allPages.length + 1,
            initialPageParam: 1,
            staleTime: 0,
        });
    }, [event]);

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        refetch
    } = useDynamicQuery();


    useEffect(() => {
        if (event === "created" || event === "updated") {
            refetch();
            clear()
        }
    }, [event, refetch, clear]);

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
