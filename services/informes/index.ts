import { api } from "@/api/api";


export const getInformesIa = async () => {
    const { data } = await api.get('/api/informesia?PageNumber=1');
    return data.data;

}