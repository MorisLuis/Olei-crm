/**
 * Formats a given date (string or Date object) into a readable Spanish date string,
 * based on the UTC year, month, and day. The time part is ignored.
 *
 * This avoids timezone shifts by extracting UTC components and reconstructing
 * a local date with those components.
 *
 * @param {string | Date} value - The date value to format. Can be a Date object or an ISO date string.
 * @returns {string} - Formatted date string in the format "d 'de' MMMM 'de' yyyy" (e.g., "7 de junio de 2025").
 *
 * @example
 * ```ts
 * formatDate('2025-06-07T22:10:55.926Z'); // "7 de junio de 2025"
 * formatDate(new Date()); // "8 de junio de 2025" (depending on current date)
 * ```
 */

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (value: string | Date): string => {
  if (!value) return '';

  const date = typeof value === 'string' ? new Date(value) : value;

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-indexed
  const day = date.getUTCDate();

  const fixedDate = new Date(year, month, day);

  return format(fixedDate, "d 'de' MMMM 'de' yyyy", { locale: es });
};
