import { CalendarInterface, TimelineInterface } from "@/interface/calendar";


export const calendarData: CalendarInterface[] = [
    { Titulo: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 2 },
    { Titulo: 'Llamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 1 },
    { Titulo: 'Cotizacion', Fecha: new Date(2024, 10, 22), TableType: "Ventas", Id_Sell: "4-1--0" },
    { Titulo: 'Videollamada para temas muy importantes', Fecha: new Date(2024, 10, 22), TableType: "Bitacora", Id_Bitacora: 3 },
    { Titulo: 'Remisión', Fecha: new Date(2024, 10, 22), TableType: "Ventas", Id_Sell: "1-1--0" },
    { Titulo: 'Remision', Fecha: new Date(2024, 10, 25), TableType: "Ventas", Id_Sell: "2-1--0" },
    { Titulo: 'Evento 3', Fecha: new Date(2024, 11, 15), TableType: "Bitacora", Id_Bitacora: 4 },
    { Titulo: 'Evento 4', Fecha: new Date(2024, 11, 15), TableType: "Ventas", Id_Sell: "1-3--0" },
    { Titulo: 'Evento 5', Fecha: new Date(2024, 11, 15), TableType: "Bitacora", Id_Bitacora: 4 },
    { Titulo: 'Evento 6', Fecha: new Date(2024, 11, 15), TableType: "Bitacora", Id_Bitacora: 5 }
]


export const calendarTimelineExamples: TimelineInterface[] = [
    { Titulo: 'Reunion madrugada', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 1, Hour: "01:30", HourEnd: "02:20" },
    { Titulo: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 2, Hour: "12:30", HourEnd: "13:20" },
    { Titulo: 'Reunion para temas muy importantes', Fecha: new Date(2024, 10, 27), TableType: "Bitacora", Id_Bitacora: 3, Hour: "12:30", HourEnd: "14:20" },
    { Titulo: 'Remisión', Folio: 21, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "1-1--0" },
    { Titulo: 'Cotización', Folio: 212, Fecha: new Date(2024, 10, 27), TableType: "Ventas", Id_Sell: "2-1--0" }
] 