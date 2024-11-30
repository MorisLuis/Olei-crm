import { CalendarInterface, TimelineInterface } from "@/interface/calendar";


export const calendarData: CalendarInterface[] = [
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", id: 1 },
    { Title: 'Llamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", id: 2 },
    { Title: 'Cotizacion', Fecha: new Date(2024, 10, 22), TableType: "Ventas", id: 3 },
    { Title: 'Videollamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", id: 3 },
    { Title: 'Remisión', Fecha: new Date(2024, 10, 22), TableType: "Ventas", id: 1 },
    { Title: 'Remision', Fecha: new Date(2024, 10, 25), TableType: "Ventas", id: 1 },
    { Title: 'Evento 3', Fecha: new Date(2024, 11, 5), TableType: "Bitacora", id: 1 },
    { Title: 'Evento 4', Fecha: new Date(2024, 11, 10), TableType: "Ventas", id: 1 },
    { Title: 'Evento 5', Fecha: new Date(2024, 11, 15), TableType: "Bitacora", id: 1 },
    { Title: 'Evento 6', Fecha: new Date(2024, 11, 20), id: 1 },
]


export const calendarTimelineExamples: TimelineInterface[] = [
    { Title: 'Reunion madrugada', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 1, Hour: "01:30", HourEnd: "02:20" },
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 2, Hour: "12:30", HourEnd: "13:20" },
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 3, Hour: "12:30", HourEnd: "14:20" },
    { Title: 'Remisión', Folio: 21, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "1"},
    { Title: 'Cotización', Folio: 212, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "2"}
] 