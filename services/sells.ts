import { api } from "@/api/api";
import { OrderObject } from "@/components/UI/OrderComponent";
import { FilterSellsByClient } from "@/interface/sells";

interface getSellsInterface {
    PageNumber: number;
    SellsOrderCondition: OrderObject;
}


export const getSells = async ({
    PageNumber,
    SellsOrderCondition
}: getSellsInterface) => {

    try {
        const data = await api.get(`/api/sells?PageNumber=${PageNumber}&sellsOrderCondition=${SellsOrderCondition?.order}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};

interface getSellsByClientInterface {
    client: number;
    PageNumber?: number;
    filters: FilterSellsByClient;
}

export const getSellsByClient = async ({
    client,
    PageNumber,
    filters
}: getSellsByClientInterface) => {

    try {
        const data = await api.get(`/api/sells/client/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`);
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
};

export const getTotalSellsByClient = async ({ client, filters }: { client: number, filters: FilterSellsByClient }) => {

    try {
        const data = await api.get(`/api/sells/client/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
}