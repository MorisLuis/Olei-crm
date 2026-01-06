import { useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCalendarByMonth, getCalendarByMonthAndClient } from "@/services/calendar/calendar.service";
import { normalizeCalendarEvents } from "./utils/normalizeCalendarEvents";
import { CalendarInterface } from "@/interface/calendar";
import { EventInput } from "@fullcalendar/core/index.js";
import { useMeetingEvents } from "@/context/Meetings/MeetingsContext";

interface UseGetEventsCalendarParams {
    month: number;
    year: number;
    Id_Cliente?: number;
}

interface PaginatedResponse<T> {
    data: T[];
    nextPage?: number;
    TotalBitacora?: number;
    TotalVentas?: number;
}

interface UseGetEventsCalendarResponse<T> {
    dataEvents: EventInput[];
    TotalBitacora?: number;
    TotalVentas?: number;
    refetch: () => void;
    fetchNextPage: () => void;
    isLoading: boolean;
}

export const useGetEventsCalendar = <T,>(
    params: UseGetEventsCalendarParams
): UseGetEventsCalendarResponse<T> => {
    const { month, year, Id_Cliente } = params;
    const { event, clear } = useMeetingEvents();

    const fetchData = useCallback(
        async (pageParam: number): Promise<PaginatedResponse<T>> => {
            const { tasks } = Id_Cliente ?
                await getCalendarByMonthAndClient({ Anio: year, Mes: month, Id_Cliente })
                : await getCalendarByMonth({ Anio: year, Mes: month });

            return {
                data: tasks as unknown as T[],
                nextPage: tasks.length === 0 ? undefined : pageParam + 1,
            };
        },
        [month, year]
    );

    const useDynamicQuery = useCallback(() => {
        return useInfiniteQuery({
            queryKey: ["eventCalendar", year, month],
            queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
            initialPageParam: 1,
            staleTime: 0,
            getNextPageParam: (lastPage) => lastPage.nextPage,
        });
    }, [fetchData, month, year, event]);

    const { data, refetch, isLoading, fetchNextPage } = useDynamicQuery();

    useEffect(() => {
        if (event === "created" || event === "updated") {
            refetch();
            clear()
        }
    }, [event, refetch, clear]);

    const dataResponse = data?.pages.flatMap((p) => p.data) ?? [];

    const dataEvents = normalizeCalendarEvents(dataResponse as CalendarInterface[]);

    return {
        dataEvents,
        refetch,
        fetchNextPage,
        isLoading,
    };
};
