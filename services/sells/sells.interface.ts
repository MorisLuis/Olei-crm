import { FilterSellsByClient } from "../cobranza/cobranza.interface";

/* PARAMS */
interface getSellsInterface {
    PageNumber: number;
    filters: FilterSells;
};

interface getSellsByClientInterface {
    client: number;
    PageNumber?: number;
    filters: FilterSellsByClient;
};

interface getSellByIdInterface {
    Folio: string;
    Serie: string;
    Id_Almacen: number;
    TipoDoc: typeTipoDoc;
};

// FILTERS
interface FilterSells {
    SellsOrderCondition?: SellsOrderConditionType;
    termSearch: string;
};

type typeTipoDoc = 0 | 1 | 2 | 3 | 4;
const TipoDoc: typeTipoDoc[] = [0, 1, 2, 3, 4];

const tipoDocMap = {
    0: 'Otro',
    1: 'Facturas',
    2: 'Remisión',
    3: 'Pedidos',
    4: 'Cotización',
} as const;

type SellsOrderConditionType = 'Nombre' | 'Saldo' | 'Total';
const SellsOrderCondition = ['Nombre', 'Saldo', 'Total'] as const;

type SellsOrderByClientConditionType = | 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
const SellsOrderByClientCondition: SellsOrderByClientConditionType[] = [
    'TipoDoc',
    'Folio',
    'Fecha',
    'FechaEntrega',
    'ExpiredDays',
];

type SellsFilterConditionByClientType = 'TipoDoc' | 'Expired' | 'Not Expired';
const SellsFilterCondition: SellsFilterConditionByClientType[] = [
    'TipoDoc',
    'Expired',
    'Not Expired',
];

const SellsConditionObject: ReadonlyArray<{
    value: SellsOrderConditionType;
    label: string;
}> = [
    {
        value: 'Nombre',
        label: 'Nombre',
    },
    {
        value: 'Saldo',
        label: 'Saldo'
    },
    {
        value: 'Total',
        label: 'Total'
    }
] as const;

const SellsByClientConditionObject: ReadonlyArray<{
    value: SellsOrderByClientConditionType;
    label: string;
}> = [
    {
        value: 'TipoDoc',
        label: 'Tipo de documento',
    },
    {
        value: 'Folio',
        label: 'Folio'
    },
    {
        value: 'Fecha',
        label: 'Fecha'
    },
    {
        value: 'FechaEntrega',
        label: 'Fecha de entrega'
    },
    {
        value: 'ExpiredDays',
        label: 'Dias expirados'
    }
] as const;



export {
    TipoDoc,
    tipoDocMap,
    SellsOrderCondition,
    SellsOrderByClientCondition,
    SellsFilterCondition,
    SellsConditionObject,
    SellsByClientConditionObject
}

export type {
    FilterSells,

    typeTipoDoc,
    SellsOrderConditionType,
    SellsOrderByClientConditionType,
    SellsFilterConditionByClientType,

    getSellsInterface,
    getSellsByClientInterface,
    getSellByIdInterface
}