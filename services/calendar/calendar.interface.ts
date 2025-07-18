import { CalendarInterface, TimelineInterface } from "@/interface/calendar";

/* PARAMS */
interface  GetCalendarByMonthParams {
    Anio: number;
    Mes: number;

};

interface GetCalendarByMonthAndClientParams {
    Anio: number;
    Mes: number;
    Id_Cliente: number;
};

interface GetCalendarTaskByDayParams {
    Day: string;
    Id_Cliente: string | null;
    page: number
};


/* RESPONSE */
interface GetCalendarByMonthResponse {
    tasks: CalendarInterface[]
};

interface GetCalendarByMonthAndClientResponse {
    tasks: CalendarInterface[]
};

interface GetCalendarTaskByDayResponse {
    tasks: TimelineInterface[]
}

export type {

    // PARAMS
    GetCalendarByMonthParams,
    GetCalendarByMonthAndClientParams,
    GetCalendarTaskByDayParams,

    // RESPONSE
    GetCalendarByMonthResponse,
    GetCalendarByMonthAndClientResponse,
    GetCalendarTaskByDayResponse
}