
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
interface getCobranzaInterface {
    PageNumber: number;
    filters: FilterCobranza;
};

interface getCobranzaByClientInterface {
    Id_Almacen: number,
    client: number;
    PageNumber: number;
    filters: FilterCobranzaByClient;
};

interface getTotalCobranzaInterface {
    client: number;
    filters: FilterCobranzaByClient;
};

// UTILS
interface FilterSellsByClient {
    FilterExpired: 0 | 1;
    FilterNotExpired: 0 | 1;
    TipoDoc: 0 | 1 | 2 | 3 | 4;
    DateExactly?: string;
    DateStart?: string;
    DateEnd?: string;
    sellsOrderCondition?: string;
    termSearch: string;
};

interface FilterCobranzaByClient extends Omit<FilterSellsByClient, 'sellsOrderCondition'>  {
    cobranzaOrderCondition?: string;
}

interface CobranzaResponse {
    cobranza: CobranzaInterface[];
    count: number;
    totalStats: totalCobranzaResponse
}

// FILTERS
type CobranzaOrderConditionType = 'Nombre' | 'ExpiredDays' | 'SaldoVencido' | 'SaldoNoVencido' | 'TotalSaldo';
export const CobranzaOrderCondition = ['Nombre', 'ExpiredDays', 'SaldoVencido', 'SaldoNoVencido', 'TotalSaldo'] as const

export const CobranzaConditionObject: ReadonlyArray<{
    value: CobranzaOrderConditionType;
    label: string;
}> = [
    {
        value: 'Nombre',
        label: 'Nombre',
    },
    {
        value: 'ExpiredDays',
        label: 'Días expirados',
    },
    {
        value: 'SaldoVencido',
        label: 'Saldo Vencido',
    },
    {
        value: 'SaldoNoVencido',
        label: 'Saldo no vencido',
    },
    {
        value: 'TotalSaldo',
        label: 'Total de saldo',
    }
] as const;

export type CobranzaByClientOrderConditionByClientType = 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
export const CobranzaByClientCondition = ['TipoDoc', 'Folio', 'Fecha', 'FechaEntrega', 'ExpiredDays'] as const;


export const CobranzaByClientConditionObject: ReadonlyArray<{
    value: CobranzaByClientOrderConditionByClientType;
    label: string;
}> = [
    {
        value: 'TipoDoc',
        label: 'Tipo documento',
    },
    {
        value: 'Folio',
        label: 'Folio',
    },
    {
        value: 'Fecha',
        label: 'Fecha',
    },
    {
        value: 'FechaEntrega',
        label: 'Fecha de Entrega',
    },
    {
        value: 'ExpiredDays',
        label: 'Días expirados',
    },
] as const;


export type typeTipoDoc = 0 | 1 | 2 | 3 | 4;
export const TipoDoc: typeTipoDoc[] = [0, 1, 2, 3, 4];

export const TipoDocObject: ReadonlyArray<{
    value: typeTipoDoc;
    label: string;
}> = [
    {
        value: 0,
        label: 'Todos',
    },
    {
        value: 1,
        label: 'Facturas',
    },
    {
        value: 2,
        label: 'Remisión',
    },
    {
        value: 3,
        label: 'Pedidos',
    },
    {
        value: 4,
        label: 'Cotización',
    },
] as const;



interface FilterCobranza {
    cobranzaOrderCondition?: CobranzaOrderConditionType;
    termSearch: string;
};


// RESPONSE:
interface totalCobranzaResponse {
    SumaSaldoVencido: number, 
    SumaSaldoNoVencido: number,
    SumaTotalSaldo: number
}

interface totalCobranzaByClientResponse {
    SumaSaldo: number, 
    SumaTotal: number
}



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
    FilterCobranzaByClient,
    CobranzaResponse,

    //RESPONSE
    totalCobranzaByClientResponse,
    totalCobranzaResponse
}