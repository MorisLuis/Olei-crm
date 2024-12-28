import { TimelineInterface } from "@/interface/calendar";
import { getCalendarTaskByDay } from "@/services/calendar";
import { useEffect, useState } from "react";

export const useEventsOfTheDay = (decodedDate: string) => {
    const [eventsOfTheDay, setEventsOfTheDay] = useState<TimelineInterface[] | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const date = new Date(decodedDate);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            //console.log({formattedDate})
            const events = await getCalendarTaskByDay(formattedDate);
            setEventsOfTheDay(events);
        };
        fetchEvents();
    }, [decodedDate]);

    return eventsOfTheDay;
};
