import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { MeetingOrderConditionObject, TipoContactoObject } from "@/services/bitacora/meeting.interface";

export const bitacoraFiltersConfig: FilterItemConfig[] = [
    {
        key: 'meetingOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: MeetingOrderConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'searchTerm',
        label: 'Nombre',
        modalLabel: 'Filtrar por nombre',
        type: 'input'
    },
    {
        key: 'TipoContacto',
        label: 'Tipo de contacto',
        modalLabel: 'Filtrar por Tipo de contacto',
        type: 'select',
        options: TipoContactoObject.map((val) => ({ label: val.label, value: val.value })),
    }
];
