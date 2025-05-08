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
    }
];
