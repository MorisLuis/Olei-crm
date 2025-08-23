
interface CobranzaInterface {
    Nombre: string;
    SaldoVencido: number;
    SaldoNoVencido: number;
    TotalSaldo: number;
    Id_Cliente: number;
    Id_Almacen: number;
    CorreoVtas: string;
};

// PARAMS
interface GetCobranzaParams {
    PageNumber: number;
    filters: CobranzaFilters;
};

interface GetCobranzaByClientParams {
    PageNumber?: number;
    filters: CobranzaByClientFilters;

    Id_Almacen: number,
    client: number;
};

interface GetTotalCobranzaParams {
    client: number;
    filters: CobranzaByClientFilters;
};

interface GetCobranzaCountAndTotalParams {
    filters: CobranzaFilters;
};


// FILTERS

interface CobranzaFilters {
    cobranzaOrderCondition?: CobranzaOrderConditionType;
    termSearch: string;
    startDate?: string
    endDate?: string
    exactlyDate?: string
};

interface CobranzaByClientFilters {
    FilterExpired: 0 | 1;
    FilterNotExpired: 0 | 1;
    TipoDoc: 0 | 1 | 2 | 3 | 4;
    DateExactly?: string;
    DateStart?: string;
    DateEnd?: string;
    cobranzaOrderCondition?: string;
    termSearch: string;
};

type CobranzaOrderConditionType = 'Nombre' | 'ExpiredDays' | 'SaldoVencido' | 'SaldoNoVencido' | 'TotalSaldo';

// RESPONSE:
interface GetCobranzaResponse {
    cobranza: CobranzaInterface[]
}

interface TotalCobranzaResponse {
    SumaSaldoVencido: number,
    SumaSaldoNoVencido: number,
    SumaTotalSaldo: number
};

interface GetTotalResponse {
    count: number,
    total: TotalCobranzaResponse
}


export type {
    CobranzaInterface,

    // PARAMS
    GetCobranzaParams,
    GetTotalCobranzaParams,
    GetCobranzaByClientParams,
    GetCobranzaCountAndTotalParams,

    // FILTERS
    CobranzaFilters,
    CobranzaByClientFilters,
    CobranzaOrderConditionType,

    // RESPONSE
    GetCobranzaResponse,
    GetTotalResponse,
    TotalCobranzaResponse,
}