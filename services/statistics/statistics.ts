import { api } from "@/api/api";
import { getStatisticsCRMResponse } from "./statistics.interface";

const getStatisticsCRM = async (): Promise<getStatisticsCRMResponse> => {
    const { data } = await api.get<getStatisticsCRMResponse>("/api/statistics/crm-brief");
    return data;
};


/* 
const getStatisticsCRM = async (): Promise<getStatisticsCRMResponse> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("No auth token");

    const { data } = await api.get<getStatisticsCRMResponse>("/api/statistics/crm-brief", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};


*/

export {
    getStatisticsCRM
}
