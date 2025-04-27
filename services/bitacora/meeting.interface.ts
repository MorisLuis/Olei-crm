import { FiltersMeetings, MeetingOrderConditionType } from "@/interface/meeting";

interface getMeetingsInterface {
    PageNumber: number;
    filters: FiltersMeetings;
};

interface getTotalMeetingsInterface {
    filters: FiltersMeetings;
};

export const MeetingConditionObject: ReadonlyArray<{
    value: MeetingOrderConditionType;
    label: string;
}> = [
    {
        value: 'Cliente',
        label: 'Cliente',
    },
    {
        value: 'Fecha',
        label: 'Fecha'
    },
    {
        value: 'TipoContacto',
        label: 'Tipo de contacto'
    }
] as const;

export type {
    getMeetingsInterface,
    getTotalMeetingsInterface
}