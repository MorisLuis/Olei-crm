import { getCalendarTaskByDay } from '@/services/calendar/calendar.service';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMeetingEvents } from '@/context/Meetings/MeetingsContext';

interface useGetEventsCalendarByDayResponse {
    timelineTasks: any[] | null;
    TotalBitacora: number;
    TotalVentas: number;
    isLoading: boolean;
}


export const useGetEventsCalendarByDay = (
    idCliente: string | null,
): useGetEventsCalendarByDayResponse => {

    const pathname = usePathname();
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const decodedDate = decodeURIComponent(lastSegment!);
    const { event } = useMeetingEvents();

    const [timelineTasks, setTimelineTasks] = useState<any[]>([]);
    const [TotalBitacora, setTotalBitacora] = useState(0);
    const [TotalVentas, setTotalVentas] = useState(0);
    const [isLoading, setisLoading] = useState(true)

    const date = new Date(decodedDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const fetchTasksData = async () => {
        try {
            const tasks = await getCalendarTaskByDay({
                Day: formattedDate,
                Id_Cliente: idCliente,
                PageNumber: 1,
                limit: 100,
            });
            setTimelineTasks(tasks.tasks);
            setTotalBitacora(tasks.TotalBitacora)
            setTotalVentas(tasks.TotalVentas)
        } catch (error) {
            console.error('Error fetching calendar tasks by day:', error);
        } finally {
            setisLoading(false)
        }
    }

    useEffect(() => {
        fetchTasksData();
    }, [event])

    return {
        timelineTasks,
        TotalBitacora,
        TotalVentas,
        isLoading
    };
};
