import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { CobranzaConditionObject } from "@/utils/constants/cobranza";

export const cobranzaFiltersConfig: FilterItemConfig[] = [
    {
        key: 'cobranzaOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: CobranzaConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'termSearch',
        label: 'Nombre',
        type: 'input'
    }
];
