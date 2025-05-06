import { SellsInterface } from "@/interface/sells";

/* PARAMS */
interface GetSellsParams {
    PageNumber: number;
    filters: SellsFilters;
};

interface GetSellsByClientParams {
    PageNumber?: number;
    client: number;
    filters: SellsByClientFilters;
};

interface GetSellByIdParams {
    Folio: string;
    Serie: string;
    Id_Almacen: number;
    TipoDoc: typeTipoDoc;
};

// FILTERS
interface SellsFilters {
    sellsOrderCondition?: SellsOrderConditionType;
    searchTerm: string;
};

interface SellsByClientFilters {
    FilterExpired: 0 | 1 | number;
    FilterNotExpired: 0 | 1 | number;
    TipoDoc: 0 | 1 | 2 | 3 | 4 | number;
    DateExactly?: string;
    DateStart?: string;
    DateEnd?: string;
    sellsOrderCondition?: string;
};

type typeTipoDoc = 0 | 1 | 2 | 3 | 4;
type SellsOrderConditionType = 'Nombre' | 'Saldo' | 'Total';
type SellsOrderByClientConditionType = | 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
type SellsFilterConditionByClientType = 'TipoDoc' | 'Expired' | 'Not Expired';


// RESPONSE:
interface TotalSellsResponse {
    SumaSubtotal: number, 
    SumaTotal: number
}

interface GetSellsResponse {
    sells: SellsInterface[], 
    count: number, 
    total: TotalSellsResponse
}


export type {
    SellsFilters,
    SellsByClientFilters,

    typeTipoDoc,
    SellsOrderConditionType,
    SellsOrderByClientConditionType,
    SellsFilterConditionByClientType,

    // PARAMS
    GetSellsParams,
    GetSellsByClientParams,
    GetSellByIdParams,

    // Response
    TotalSellsResponse,
    GetSellsResponse
}