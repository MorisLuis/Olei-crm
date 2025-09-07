import { SellsFilterConditionByClientType, SellsOrderByClientConditionType, SellsOrderConditionType, typeTipoDoc } from "@/services/sells/sells.interface";


const SellsFilterCondition: SellsFilterConditionByClientType[] = [
    'TipoDoc',
    'Expired',
    'Not Expired',
];

const SellsOrderCondition = ['Nombre', 'Total'] as const;


const TipoDoc: typeTipoDoc[] = [0, 1, 2, 3, 4];

const tipoDocMap = {
    0: 'Otro',
    1: 'Facturas',
    2: 'Remisión',
    3: 'Pedidos',
    4: 'Cotización',
    5: 'N/A'
} as const;


const SellsConditionObject: ReadonlyArray<{
    value: SellsOrderConditionType;
    label: string;
}> = [
    {
        value: 'Nombre',
        label: 'Nombre',
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
        value: 'ExpiredDays',
        label: 'Dias expirados'
    }
] as const;

const SellsOrderByClientCondition = [ 'TipoDoc', 'Folio', 'Fecha', 'ExpiredDays'] as const;


export {
    TipoDoc,
    tipoDocMap,
    SellsOrderCondition,
    SellsOrderByClientCondition,
    SellsFilterCondition,
    SellsConditionObject,
    SellsByClientConditionObject
}