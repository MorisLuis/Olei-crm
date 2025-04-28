import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { SellsConditionObject } from "@/services/sells/sells.interface";

export const sellsFiltersConfig: FilterItemConfig[] = [
    {
        key: 'SellsOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: SellsConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'termSearch',
        label: 'Nombre',
        type: 'input'
    }
];
