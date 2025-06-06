import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { ClientConditionObject } from "@/services/clients/clients.interface";

export const clientsFiltersConfig: FilterItemConfig[] = [
    {
        key: 'clientOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: ClientConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'searchTerm',
        label: 'Buscar por nombre',
        type: 'input'
    },
    {
        key: 'searchId',
        label: 'Buscar por id',
        type: 'input'
    }
];
