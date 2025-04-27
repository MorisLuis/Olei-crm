import { FilterItemConfig } from "@/components/Filter/FilterBar";
import { MeetingConditionObject } from "@/services/bitacora/meeting.interface";

export const bitacoraFiltersConfig: FilterItemConfig[] = [
    {
        key: 'meetingOrderCondition',
        label: 'Ordenar',
        type: 'select',
        options: MeetingConditionObject.map((val) => ({ label: val.label, value: val.value })),
    },
    {
        key: 'termSearch',
        label: 'Nombre',
        type: 'input'
    },
    {
        key: 'FilterCliente',
        label: 'Client',
        type: 'select'
    },
    {
        key: 'FilterTipoContacto',
        label: 'Tipo de contacto',
        type: 'select'
    },
    {
        key: 'Id_Cliente',
        label: 'Id Cliente',
        type: 'select'
    }
];
