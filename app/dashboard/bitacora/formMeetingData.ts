import { OptionType } from "@/components/Inputs/select";
import MeetingInterface from "@/interface/meeting";


const optionTipoMeeting: OptionType[] = [
    { value: 1, label: 'Reunión' },
    { value: 2, label: 'Llamada' },
    { value: 3, label: 'Cita' },
    { value: 4, label: 'Tarea' },
];

const INITIAL_MEETING: MeetingInterface = {
    Nombre: '',
    Fecha: '',
    Hour: '',
    HourEnd: '',
    Descripcion: '',
    Titulo: '',
    TipoContacto: 0,
    Comentarios: '',
    Id_Bitacora: 0,
    Id_Cliente: 0,
    Id_Almacen: 0
};



export {
    optionTipoMeeting,
    INITIAL_MEETING
}