import { parse, format } from 'date-fns';

const formatTime = (time: string): string => {
  // Si el tiempo no tiene segundos, agregamos '00' al final
  const timeWithSeconds = time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time;

  // Parseamos la cadena con el formato correcto
  const parsedTime = parse(timeWithSeconds, 'HH:mm:ss', new Date());

  // Devolvemos el formato deseado
  return format(parsedTime, 'hh:mm a');
};

const getActualHour = (): { hour: string, hourEnd: string } => {

  const now = new Date().toLocaleTimeString('es-MX', {
    timeZone: 'America/Mexico_City',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Formato 24 horas
  });

  const oneHourLater = new Date();
  oneHourLater.setHours(oneHourLater.getHours() + 1);

  const hourEnd = oneHourLater.toLocaleTimeString('es-MX', {
    timeZone: 'America/Mexico_City',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return {
    hour: now,
    hourEnd
  }
};

const getCorrectDate = (Fecha: Date | string) : Date => {
      // Crear la fecha a partir del string ISO
      const utcDate = new Date(Fecha);
      // Ajustar la fecha sumándole el offset en milisegundos para "neutralizar" la conversión a local
      const adjustedDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
      return adjustedDate
}

export {
  formatTime,
  getActualHour,
  getCorrectDate
}