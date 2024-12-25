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

}