import { api } from "@/api/api";

export const postExcell = async () => {

    try {
        const data = await api.post(`/api/excell`);
        return data;
    } catch (error) {
        return { error: error };
    };

}


export const getExcell = async () => {

    try {
        const data = await api.get(`/api/excell/25`);
        return data;
    } catch (error) {
        return { error: error };
    };

}