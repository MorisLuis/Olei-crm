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
        key: 'DateRange',  // Nuevo grupo para los tres filtros de fecha
        label: 'Fecha',
        type: 'date-range',  // Personalizado para indicar que este es un grupo de fechas
        children: [  // Aquí metemos los tres filtros como "hijos"
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
