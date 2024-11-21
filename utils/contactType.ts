import MeetingInterface from '../interface/meeting';

export const contactType = (value: MeetingInterface['TipoContacto']) => {

    console.log({value})

    let type = "Llamada"

    if ( value === 1) type = "Llamada"
    if ( value === 2) type = "Reunion"
    if ( value === 3) type = "Cita"
    if ( value === 4) type = "Videollamada"

    return type
}