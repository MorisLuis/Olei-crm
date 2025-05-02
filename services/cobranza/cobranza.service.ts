import { api } from "@/api/api";
import { SellsInterface } from "@/interface/sells";
import { CobranzaInterface, CobranzaResponse, getCobranzaByClientInterface, getCobranzaInterface, getTotalCobranzaInterface, totalCobranzaByClientResponse, totalCobranzaResponse } from "./cobranza.interface";

const getCobranza = async (params: getCobranzaInterface): Promise<CobranzaResponse> => {

    const { data } = await api.get<{ cobranza: CobranzaInterface[]; count: number, total: totalCobranzaResponse }>(
        '/api/sells/cobranza/clients',
        {
            params: {
                PageNumber: params.PageNumber,
                ...params.filters,
            }
        });

    return {
        cobranza: data.cobranza,
        count: data.count,
        totalStats: data.total
    };

};

const getCobranzaByClient = async ({
    Id_Almacen,
    client,
    PageNumber,
    filters
}: getCobranzaByClientInterface): Promise<{ cobranza: SellsInterface[], count: number, totalStats: totalCobranzaByClientResponse }> => {

    const params = new URLSearchParams({
        PageNumber: String(PageNumber),
        FilterExpired: String(filters.FilterExpired ?? ''),
        FilterNotExpired: String(filters.FilterNotExpired ?? ''),
        TipoDoc: String(filters.TipoDoc ?? ''),
        DateEnd: filters.DateEnd || '',
        DateStart: filters.DateStart || '',
        DateExactly: filters.DateExactly || '',
        cobranzaOrderCondition: filters.cobranzaOrderCondition || '',
    });

    const { data: { cobranza, total, count } } = await api.get<{ cobranza: SellsInterface[], count: number, total: totalCobranzaByClientResponse}>(
        `/api/sells/cobranza/${client}?${params.toString()}&Id_Almacen=${Id_Almacen}`
    );

    return { cobranza, totalStats: total, count };
};


const getTotalCobranza = async ({
    client,
    filters
}: getTotalCobranzaInterface): Promise<{ total: number }> => {
    const { data } = await api.get<{ total: number }>(`/api/sells/cobranza/total/${client}?FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`);
    return { total: data.total };
};

export {
    getCobranzaByClient,
    getCobranza,
    getTotalCobranza
}