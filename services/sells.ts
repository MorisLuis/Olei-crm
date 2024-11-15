import { api } from "@/api/api";


export const getSells = async (term: string) => {

    try {
        const { data: { Clients } } = await api.get(`/api/search/client?term=${term}`);
        return Clients;
    } catch (error) {
        return { error: error };
    }
}