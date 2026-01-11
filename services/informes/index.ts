import { api } from "@/api/api";
import { CreateInformeIaProps } from "./types";


export const getInformesIa = async () => {
    const { data } = await api.get('/api/informesia?PageNumber=1');
    return data.data;

}

export const createInformeIa = async (informeData: CreateInformeIaProps) => {
    const { body, queryId } = informeData;
    const { data } = await api.post(`/api/informesia?queryId=${queryId}`, body);
    return data;
}   