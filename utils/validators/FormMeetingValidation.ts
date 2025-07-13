
export const dateValidation = (date: Date | string): boolean => {

  let dateString: string;

  if (date instanceof Date) {
    dateString = date.toISOString().split('T')[0]; // Convertir Date a 'YYYY-MM-DD'
  } else if (typeof date === 'string') {
    dateString = transformDate(date);
  } else {
    return false; // No es un Date ni un string válido
  }

  // Expresión regular para validar el formato 'YYYY-MM-DD'
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  return regex.test(dateString);
};

export const hourValidation = (hour: string): boolean => {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(hour);
};

export const emailValidation = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/* UTILS */
const transformDate = (date: string): string => {
  let dateString;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)) {
    // Si tiene formato 'YYYY-MM-DDTHH:mm:ss.sssZ', lo convertimos
    dateString = date.split('T')[0];
  } else {
    dateString = date; // Mantenerlo como está si ya es 'YYYY-MM-DD'
  }

  return dateString
};