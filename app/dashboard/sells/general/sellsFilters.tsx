import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { SellsConditionObject } from "@/utils/constants/sells";

export const sellsFiltersConfig: FilterItemConfig[] = [
    {
        key: 'sellsOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: SellsConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'searchTerm',
        label: 'Nombre',
        type: 'input'
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
