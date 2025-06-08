/**
 * Formatea una fecha (o usa la fecha actual si no se proporciona o es inválida)
 * y la devuelve en formato 'YYYY-MM-DD' (UTC).
 *
 * @param date Fecha como string, Date o undefined.
 * @returns Fecha en formato 'YYYY-MM-DD'.
 */

export const formatDateIsoOrNow = (date?: string | Date): string => {
  let dateObj: Date;

  // Si no hay fecha, usamos la actual
  if (!date) {
    dateObj = new Date();
  } else if (typeof date === 'string') {
    dateObj = new Date(date);

    // Si es inválida, también usamos la actual
    if (isNaN(dateObj.getTime())) {
      console.warn("⚠️ Fecha inválida recibida. Usando la fecha actual.");
      dateObj = new Date();
    }
  } else {
    dateObj = date;
  }

  // Retorna formato UTC 'YYYY-MM-DD'
  return dateObj.toISOString().split('T')[0];
};
