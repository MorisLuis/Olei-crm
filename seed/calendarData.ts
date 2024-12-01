import { CalendarInterface, TimelineInterface } from "@/interface/calendar";


export const calendarData: CalendarInterface[] = [
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 2 },
    { Title: 'Llamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 1 },
    { Title: 'Cotizacion', Fecha: new Date(2024, 10, 22), TableType: "Ventas", Id_Sell: "4-1--0" },
    { Title: 'Videollamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 3 },
    { Title: 'Remisión', Fecha: new Date(2024, 10, 22), TableType: "Ventas", Id_Sell: "1-1--0" },
    { Title: 'Remision', Fecha: new Date(2024, 10, 25), TableType: "Ventas", Id_Sell: "2-1--0" },
    { Title: 'Evento 3', Fecha: new Date(2024, 11, 5), TableType: "Bitacora", Id_Bitacora: 4 },
    { Title: 'Evento 4', Fecha: new Date(2024, 11, 10), TableType: "Ventas", Id_Sell: "1-3--0" },
    { Title: 'Evento 5', Fecha: new Date(2024, 11, 15), TableType: "Bitacora", Id_Bitacora: 4 },
    { Title: 'Evento 6', Fecha: new Date(2024, 11, 20), TableType: "Bitacora", Id_Bitacora: 5 }
]


export const calendarTimelineExamples: TimelineInterface[] = [
    { Title: 'Reunion madrugada', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 1, Hour: "01:30", HourEnd: "02:20" },
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 2, Hour: "12:30", HourEnd: "13:20" },
    { Title: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 3, Hour: "12:30", HourEnd: "14:20" },
    { Title: 'Remisión', Folio: 21, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "1-1--0" },
    { Title: 'Cotización', Folio: 212, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "2-1--0" }
] 