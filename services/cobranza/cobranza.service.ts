import { api } from "@/api/api";
import { SellsInterface } from "@/interface/sells";
import { GetCobranzaByClientParams, GetCobranzaCountAndTotalParams, GetCobranzaParams, GetCobranzaResponse, GetTotalResponse, TotalCobranzaResponse } from "./cobranza.interface";

const getCobranza = async (params: GetCobranzaParams): Promise<GetCobranzaResponse> => {

    const { data } = await api.get<GetCobranzaResponse>(
        '/api/sells/cobranza/clients',
        {
            params: {
                PageNumber: params.PageNumber,
                ...params.filters,
            }
        });

    return {
        cobranza: data.cobranza
    };

};

const getCobranzaCountAndTotal = async (params: GetCobranzaCountAndTotalParams): Promise<GetTotalResponse> => {

    const { data: { total, count } } = await api.get<GetTotalResponse>(
        '/api/sells/cobranza/clients/totals',
        {
            params: {
                ...params.filters,
            }
        });

    return { count, total };

};

const getCobranzaByClient = async ({
    Id_Almacen,
    client,
    PageNumber,
    filters
}: GetCobranzaByClientParams): Promise<{ cobranza: SellsInterface[], count: number, totalStats: TotalCobranzaResponse }> => {

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

    const { data: { cobranza, total, count } } = await api.get<{ cobranza: SellsInterface[], count: number, total: TotalCobranzaResponse }>(
        `/api/sells/cobranza/${client}?${params.toString()}&Id_Almacen=${Id_Almacen}`
    );

    return { cobranza, totalStats: total, count };
};

const getCobranzaByClientCountAndTotal = async ({
    Id_Almacen,
    client,
    filters
}: GetCobranzaByClientParams ): Promise<GetTotalResponse> => {

    const params = new URLSearchParams({
        FilterExpired: String(filters.FilterExpired ?? ''),
        FilterNotExpired: String(filters.FilterNotExpired ?? ''),
        TipoDoc: String(filters.TipoDoc ?? ''),
        DateEnd: filters.DateEnd || '',
        DateStart: filters.DateStart || '',
        DateExactly: filters.DateExactly || ''
    });

    const { data: { total, count } } = await api.get<GetTotalResponse>(
        `/api/sells/cobranza/totals/${client}?${params.toString()}&Id_Almacen=${Id_Almacen}`
    );

    return { total, count };
};

export {
    getCobranza,
    getCobranzaCountAndTotal,
    getCobranzaByClient,
    getCobranzaByClientCountAndTotal
}