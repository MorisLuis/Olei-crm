import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (value: Date) => {
    const formattedDate = format(value, "d 'de' MMMM 'de' yyyy", { locale: es });
    return formattedDate;
};
