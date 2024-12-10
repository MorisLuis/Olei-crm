import { api } from "@/api/api";

interface getSellsInterface {
    PageNumber: number;
    SellsOrderCondition?: string;
}


export const getSells = async ({
    PageNumber,
    SellsOrderCondition
}: getSellsInterface) => {

    try {
        const data = await api.get(`/api/sells?PageNumber=${PageNumber}&SellsOrderCondition=${SellsOrderCondition}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
}