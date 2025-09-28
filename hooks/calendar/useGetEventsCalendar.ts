import { getCalendarByMonth } from "@/services/calendar/calendar.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { normalizeCalendarEvents } from "./utils/normalizeCalendarEvents";
import { CalendarInterface } from "@/interface/calendar";
import { EventInput } from "@fullcalendar/core/index.js";

interface useGetEventsCalendarParams {
    month: number;
    year: number;
};

interface PaginatedResponse<T> {
    data: T[];
    nextPage?: number;
    TotalBitacora?: number;
    TotalVentas?: number;  
}

interface useGetEventsCalendarResponse<T> {
    dataEvents: EventInput[];
    TotalBitacora?: number;
    TotalVentas?: number;
    refetch: () => void;
    fetchNextPage: () => void;
    isLoading: boolean;
}

export const useGetEventsCalendar = <T,>(params: useGetEventsCalendarParams): useGetEventsCalendarResponse<T> => {

    const { month, year } = params;

    const fetchData = async <T,>(
        pageParam: number
    ): Promise<PaginatedResponse<T>> => {
        const { tasks } = await getCalendarByMonth({ Anio: year, Mes: month });
        return {
            data: tasks as unknown as T[],
            nextPage: tasks.length === 0 ? undefined : pageParam + 1,
        };
    };

    const useDynamicQuery = <T,>() => {
        return useInfiniteQuery({
            queryKey: ["eventCalendar", year, month],
            queryFn: ({ pageParam = 1 }) => fetchData<T>(pageParam),
            initialPageParam: 1,
            staleTime: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });
    }

    const { data, refetch, isLoading, fetchNextPage } = useDynamicQuery();
    const dataResponse = data?.pages[0].data
    const dataEvents = normalizeCalendarEvents(dataResponse as CalendarInterface[])

    return {
        dataEvents,
        refetch,
        fetchNextPage,
        isLoading
    }

}