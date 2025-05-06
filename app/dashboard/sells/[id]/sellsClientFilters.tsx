import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { TipoDocObject } from "@/utils/constants/cobranza";
import { SellsByClientConditionObject } from "@/utils/constants/sells";

export const sellsByClientFiltersConfig: FilterItemConfig[] = [
    {
        key: 'sellsOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: SellsByClientConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'TipoDoc',
        label: 'Tipo de Documento',
        type: 'select',
        options: TipoDocObject.map((val) => ({ label: val.label, value: val.value })),
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
