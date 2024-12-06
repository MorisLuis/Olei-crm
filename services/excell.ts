import { api } from "@/api/api";

export const postExcell = async () => {

    try {
        const data = await api.post(`/api/excell`);
        console.log({data})
        return data;
    } catch (error) {
        return { error: error };
    };

}


export const getExcell = async () => {

    try {
        const data = await api.get(`/api/excell/25`);
        console.log({data})
        return data;
    } catch (error) {
        return { error: error };
    };

}