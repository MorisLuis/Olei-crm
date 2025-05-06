import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { CobranzaByClientConditionObject, TipoDocObject } from "@/utils/constants/cobranza";

export const cobranzaByClientFiltersConfig: FilterItemConfig[] = [
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
            { label: 'Filtrar Vencido', value: 'FilterExpired', activeValue: "Vencido" },
            { label: 'Filtrar No Vencido', value: 'FilterNotExpired', activeValue: "No vencido" },
        ],
    },
    {
        key: 'DateRange',
        label: 'Fecha',
        type: 'date-range',
        children: [
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
            }
        ]
    }
];
