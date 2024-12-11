import { api } from "@/api/api";
import { OrderObject } from "@/components/UI/OrderComponent";

interface getSellsInterface {
    PageNumber: number;
    SellsOrderCondition?: OrderObject;
}


export const getSells = async ({
    PageNumber,
    SellsOrderCondition
}: getSellsInterface) => {

    console.log({PageNumber, SellsOrderCondition})

    try {
        const data = await api.get(`/api/sells?PageNumber=${PageNumber}&sellsOrderCondition=${SellsOrderCondition?.order}`);
        console.log({ data: data.data })
        return data.data;
    } catch (error) {
        return { error: error };
    }
}

export const getTotalSells = async () => {

    try {
        const data = await api.get(`/api/sells/total`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
}