import { SellsInterface } from "@/interface/sells";

/* PARAMS */
interface GetSellsParams {
    filters: SellsFilters;
};

interface GetSellsPaginatedParams extends GetSellsParams {
    PageNumber: number;
};

interface GetSellsByClientParams {
    client: number;
    filters: SellsByClientFilters;
};

interface GetSellsByClientPaginatedParams extends GetSellsByClientParams {
    PageNumber: number;
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
type SellsOrderConditionType = 'Nombre' | 'Total';
type SellsOrderByClientConditionType = | 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
type SellsFilterConditionByClientType = 'TipoDoc' | 'Expired' | 'Not Expired';


// RESPONSE:
interface TotalSellsResponse {
    SumaSubtotal: number, 
    SumaTotal: number
}

interface GetSellsResponse {
    sells: SellsInterface[]
}

interface GetSellsTotalResponse {
    count: number,
    total: TotalSellsResponse
}

interface TotalsSellsProductsReponse {
    SumaImporte: string;
    SumaImpuesto: string;
    SumaTotal: string;
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
    GetSellsPaginatedParams,
    GetSellsByClientParams,
    GetSellsByClientPaginatedParams,
    GetSellByIdParams,

    // Response
    TotalSellsResponse,
    TotalsSellsProductsReponse,
    GetSellsResponse,
    GetSellsTotalResponse
}