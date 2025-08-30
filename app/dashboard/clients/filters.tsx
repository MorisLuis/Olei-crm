import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { ClientConditionObject } from "@/services/clients/clients.interface";

export const clientsFiltersConfig: FilterItemConfig[] = [
    {
        key: 'orderField',
        label: 'Ordenar',
        type: 'select',
        options: ClientConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'Nombre',
        label: 'Buscar por nombre',
        type: 'input'
    },
    {
        key: 'Id_Cliente',
        label: 'Buscar por id',
        type: 'input'
    }
];
