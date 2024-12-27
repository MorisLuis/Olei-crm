export default interface MeetingInterface {
    Id_Bitacora: number;
    Id_Almacen?: number;
    Id_Cliente?: number;
    Fecha: Date;
    Hour: string | undefined;
    HourEnd: string | undefined;
    Titulo: string;
    Descripcion: string;
    TipoContacto: 0 | 1 | 2 | 3 | 4;
    Comentarios?: string;
};

export const validTipoContacto: Array<MeetingInterface['TipoContacto']> = [0, 1, 2, 3, 4];

export const tipoContactoMap = {
    0: "Otro",
    1: "Cita",
    2: "Llamada",
    3: "Archivo Enviado",
    4: "Videollamada"
} as const;

export type MeetingOrderConditionType = 'Cliente' | 'Fecha' | 'TipoContacto';
export const MeetingOrderCondition : MeetingOrderConditionType[] = ['Cliente' , 'Fecha' , 'TipoContacto']

export type MeetingFilterConditionType = 'Cliente' | 'TipoContacto'
export const MeetingFilterCondition : MeetingFilterConditionType[] = ['Cliente', 'TipoContacto']

export interface FiltersMeetings {
    FilterCliente: 0 | 1,
    FilterTipoContacto: 0 | 1;
    TipoContacto: 0 | 1 | 2 | 3 | 4;
    Id_Cliente?: number;
    meetingOrderCondition?: string;
}