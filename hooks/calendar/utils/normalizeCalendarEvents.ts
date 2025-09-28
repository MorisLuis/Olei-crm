import { CalendarInterface } from "@/interface/calendar";
import { EventInput } from "@fullcalendar/core/index.js";


export const normalizeCalendarEvents = (calendarData: CalendarInterface[]): EventInput[] => {

    const normalizeToISODate = (date: string | Date): string => {
        const fecha = date instanceof Date ? date : new Date(date);
        return fecha.toISOString().split('T')[0];
    };


    const calendarEvents = calendarData?.map(
        (event: Partial<CalendarInterface>) => {
            // Verificar si Fecha está definida y normalizarla a un objeto Date
            if (!event.Fecha) {
                throw new Error('La propiedad Fecha no está definida en la actividad.');
            }

            return {
                title: event.Descripcion,
                start: normalizeToISODate(event.Fecha),
                end: normalizeToISODate(event.Fecha),
                extendedProps: {
                    Id_Cliente: event.Id_Cliente,
                    TableType: event.TableType,
                    Id: event.TableType === 'Bitacora' ? event.Id_Bitacora : event.Id_Sell,
                },
            };
        }
    );

    return calendarEvents
}
