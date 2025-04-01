import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (value: Date) => {
  if (!value) return '';
  /* if (isNaN(value?.getTime())) {
        throw new Error('Invalid Date');
    }
 */
  return format(value, "d 'de' MMMM 'de' yyyy", { locale: es });
};
