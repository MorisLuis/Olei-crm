
interface CobranzaInterface {
    Nombre: string;
    SaldoVencido: number;
    SaldoNoVencido: number;
    TotalSaldo: number;
    Id_Cliente: number;
    Id_Almacen: number;
};

/* interface CobranzaInterfaceByClient extends CobranzaInterface {
    Id_Cliente: number;
    Id_Almacen: number;
}
 */
// PARAMS
interface getCobranzaInterface {
    PageNumber: number;
    filters: FilterCobranza;
};

interface getCobranzaByClientInterface {
    Id_Almacen: number,
    client: number;
    PageNumber: number;
    filters: FilterSellsByClient;
};

interface getTotalCobranzaInterface {
    client: number;
    filters: FilterSellsByClient;
};

// UTILS
interface FilterSellsByClient {
    FilterTipoDoc: 0 | 1;
    FilterExpired: 0 | 1;
    FilterNotExpired: 0 | 1;
    TipoDoc: 0 | 1 | 2 | 3 | 4;
    DateExactly?: string;
    DateStart?: string;
    DateEnd?: string;
    cobranzaOrderCondition?: string;
};

interface CobranzaResponse {
    cobranza: CobranzaInterface[];
    hasMore: boolean; // <- importante para saber si hay más páginas
}

// FILTERS
type CobranzaOrderConditionType = 'Nombre' | 'ExpiredDays' | 'SaldoVencido' | 'SaldoNoVencido' | 'TotalSaldo';
export const CobranzaOrderCondition = ['Nombre', 'ExpiredDays', 'SaldoVencido', 'SaldoNoVencido', 'TotalSaldo'] as const

export type CobranzaByClientOrderConditionByClientType = 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
export const CobranzaByClientCondition = ['TipoDoc', 'Folio', 'Fecha', 'FechaEntrega', 'ExpiredDays'] as const



interface FilterCobranza {
    cobranzaOrderCondition?: CobranzaOrderConditionType;
};





export type {
    CobranzaInterface,
    //CobranzaInterfaceByClient,

    // PARAMS
    getCobranzaInterface,
    getTotalCobranzaInterface,
    getCobranzaByClientInterface,

    //UTILS
    FilterCobranza,
    CobranzaOrderConditionType,
    FilterSellsByClient,
    CobranzaResponse
}