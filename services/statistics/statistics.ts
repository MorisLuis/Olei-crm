import { api } from "@/api/api";
import { getStatisticsCRMResponse } from "./statistics.interface";

const getStatisticsCRM = async (): Promise<getStatisticsCRMResponse> => {
    const { data } = await api.get<getStatisticsCRMResponse>("/api/statistics/crm-brief");
    console.log({data})
    return data;
};



export {
    getStatisticsCRM
}
