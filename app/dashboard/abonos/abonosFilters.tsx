import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { AbonosConditionObject } from "./utils";

export const abonosFiltersConfig: FilterItemConfig[] = [
    {
        key: 'orderField',
        label: 'Ordenar',
        type: 'select',
        options: AbonosConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'cliente.Nombre',
        label: 'Buscar por nombre',
        type: 'input'
    }
];
