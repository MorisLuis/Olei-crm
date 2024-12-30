import { api } from "@/api/api";
import { OrderObject } from "@/components/UI/OrderComponent";
import { FilterSellsByClient, SellsOrderConditionByClientType, typeTipoDoc } from "@/interface/sells";

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
        const data = await api.get(`/api/sells/client/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
}

interface getSellByIdInterface {
    Folio: string,
    Serie: string,
    Id_Almacen: number,
    TipoDoc: typeTipoDoc
}

export const getSellById = async ({
    Folio,
    Serie,
    Id_Almacen,
    TipoDoc
}: getSellByIdInterface) => {

    try {
        const data = await api.get(`/api/sells/${Folio}?Id_Almacen=${Id_Almacen}&TipoDoc=${TipoDoc}&Serie=${Serie}`);
        return data.data;
    } catch (error) {
        return { error: error };
    };

}

export const getSellDetails = async ({ Folio, PageNumber }: { Folio: string, PageNumber: Number }) => {

    try {
        const data = await api.get(`/api/order/details?folio=${Folio}&PageNumber=${PageNumber}`);
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
};

export const getTotalSellDetails = async (folio: string) => {
    try {
        const data = await api.get(`/api/order/details/total?folio=${folio}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};

interface getCobranzaInterface {
    client: number;
    PageNumber: number,
    filters: FilterSellsByClient;
}

export const getCobranza = async ({
    client,
    PageNumber,
    filters
}: getCobranzaInterface) => {

    try {
        const data = await api.get(`/api/sells/cobranza/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};

interface getTotalCobranzaInterface {
    client: number;
    filters: FilterSellsByClient
}

export const getTotalCobranza = async ({
    client,
    filters
} : getTotalCobranzaInterface ) => {

    try {
        const data = await api.get(`/api/sells/cobranza/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};
