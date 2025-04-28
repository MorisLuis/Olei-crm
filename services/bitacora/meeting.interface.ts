import MeetingInterface from "@/interface/meeting";

/* PARAMS */
interface getMeetingsInterface {
    PageNumber: number;
    filters: FiltersMeetings;
};

interface getTotalMeetingsInterface {
    filters: FiltersMeetings;
};


/* FILTERS */
interface FiltersMeetings {
    FilterCliente: 0 | 1;
    FilterTipoContacto: 0 | 1;
    TipoContacto: MeetingInterface['TipoContacto'];
    Id_Cliente?: number;
    meetingOrderCondition: string;
    termSearch: string
};

type MeetingFilterConditionType = 'Cliente' | 'TipoContacto';
const MeetingFilterCondition: MeetingFilterConditionType[] = ['Cliente', 'TipoContacto'];

type MeetingOrderConditionType = 'Cliente' | 'Fecha' | 'TipoContacto';
const MeetingOrderCondition = [
    'Cliente',
    'Fecha',
    'TipoContacto',
] as const;

const validTipoContacto: Array<MeetingInterface['TipoContacto']> = [0, 1, 2, 3, 4];

const tipoContactoMap = {
    0: 'Otro',
    1: 'Cita',
    2: 'Llamada',
    3: 'Achivo Enviado',
    4: 'Videollamada',
} as const;

type TipoContactoLabel = typeof tipoContactoMap[keyof typeof tipoContactoMap];

const TipoContactoObject: ReadonlyArray<{
    value: MeetingInterface['TipoContacto'];
    label: TipoContactoLabel;
}> = [
    {
        value: 0,
        label: 'Otro',
    },
    {
        value: 1,
        label: 'Cita'
    },
    {
        value: 2,
        label: 'Llamada'
    },
    {
        value: 3,
        label: 'Achivo Enviado'
    },
    {
        value: 4,
        label: 'Videollamada'
    }
] as const;


const MeetingOrderConditionObject: ReadonlyArray<{
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

export {
    MeetingFilterCondition,
    MeetingOrderCondition,
    validTipoContacto,
    TipoContactoObject,
    tipoContactoMap,
    MeetingOrderConditionObject
};

export type {
    FiltersMeetings,
    MeetingFilterConditionType,
    MeetingOrderConditionType,
    getMeetingsInterface,
    getTotalMeetingsInterface
}