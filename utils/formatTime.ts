import { parse, format } from 'date-fns';

export const formatTime = (time: string) => {

    // Si el tiempo no tiene segundos, agregamos '00' al final
    const timeWithSeconds = time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time;

    // Parseamos la cadena con el formato correcto
    const parsedTime = parse(timeWithSeconds, 'HH:mm:ss', new Date());

    // Devolvemos el formato deseado
    return format(parsedTime, 'hh:mm a');
};
