import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { SellsProductsConditionObject } from "@/services/sells/sellsProducts/sellsProducts.interface";

export const sellsFiltersConfig: FilterItemConfig[] = [
    {
        key: 'OrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: SellsProductsConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'Marca',
        label: 'Marca',
        type: 'input'
    },
    {
        key: 'Codigo',
        label: 'Codigo',
        type: 'input'
    },
    {
        key: 'Descripcion',
        label: 'Descripcion',
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
