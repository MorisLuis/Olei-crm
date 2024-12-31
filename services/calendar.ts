import { api } from "@/api/api";


interface getCalendarByMonthInterface {
    Anio: number;
    Mes: number;
}


export const getCalendarByMonth = async ({ Anio, Mes }: getCalendarByMonthInterface) => {

    try {
        const data = await api.get(`/api/calendar/month?Anio=${Anio}&Mes=${Mes}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
}

export const getCalendarTaskByDay = async (Day: string) => {

    try {
        const data = await api.get(`/api/calendar/day?Day=${Day}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }

};

interface getCalendarByMonthAndClientInterface {
    Anio: number;
    Mes: number;
    Id_Cliente: number
}

export const getCalendarByMonthAndClient = async ({ Anio, Mes, Id_Cliente }: getCalendarByMonthAndClientInterface) => {

    try {
        const data = await api.get(`/api/calendar/monthAndClient?Anio=${Anio}&Mes=${Mes}&Id_Cliente=${Id_Cliente}`);
        return data.data;
    } catch (error) {
        return { error: error };
    };

}