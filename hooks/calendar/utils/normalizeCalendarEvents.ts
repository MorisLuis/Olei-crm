import { CalendarInterface } from "@/interface/calendar";
import { EventInput } from "@fullcalendar/core/index.js";


export const normalizeCalendarEvents = (calendarData: CalendarInterface[]): EventInput[] => {

    const calendarEvents = calendarData?.map(
        (event: Partial<CalendarInterface>) => {
            if (!event.Fecha) {
                throw new Error('La propiedad Fecha no está definida en la actividad.');
            }

            const startDate = new Date(event.Fecha);
            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);


            const id =
                event.TableType === 'Bitacora' && event.Id_Bitacora
                    ? String(event.Id_Bitacora)
                    : event.Id_Sell ?? `unknown-${event.Id_Cliente}`;

            return {
                id,
                title: event.Descripcion ?? 'Sin título',
                start: startDate.toISOString().slice(0, 19),
                end: endDate.toISOString().slice(0, 19),
            };
        }
    );

    return calendarEvents
}
