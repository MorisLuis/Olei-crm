import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (value: string | Date): string => {
  if (!value) return '';

  // Asegura que value sea Date
  const date = typeof value === 'string' ? new Date(value) : value;

  // Extrae componentes UTC manualmente
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // OJO: 0-indexed
  const day = date.getUTCDate();


  // Crea nueva fecha pero en local, basada en componentes UTC
  const fixedDate = new Date(year, month, day);

  return format(fixedDate, "d 'de' MMMM 'de' yyyy", { locale: es });
};
