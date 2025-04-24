import { FilterItemConfig } from "@/components/navigation/FilterBar";
import { CobranzaByClientConditionObject, TipoDocObject } from "@/services/cobranza/cobranza.interface";

export const cobranzaFiltersConfig: FilterItemConfig[] = [
    {
        key: 'cobranzaOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: CobranzaByClientConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'TipoDoc',
        label: 'Tipo de Documento',
        type: 'select',
        options: TipoDocObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'ExpiredStatus',
        label: 'Estado de vencimiento',
        type: 'radio',
        options: [
            { label: 'Filtrar Vencido', value: 'FilterExpired' },
            { label: 'Filtrar No Vencido', value: 'FilterNotExpired' },
        ],
    },
    {
        key: 'DateStart',
        label: 'Fecha Inicio',
        type: 'date',
    },
    {
        key: 'DateEnd',
        label: 'Fecha Fin',
        type: 'date',
    },
    {
        key: 'DateExactly',
        label: 'Fecha Exacta',
        type: 'date',
    },
    {
        key: 'FilterTipoDoc',
        label: 'Filtrar Tipo Doc',
        type: 'select',
        options: [
            { label: 'Todos', value: 0 },
            { label: 'Sí', value: 1 },
        ],
    }
];
