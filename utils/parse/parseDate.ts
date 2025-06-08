

export const parseDateToMx = (input: string | Date): string => {
    const date = typeof input === 'string' ? new Date(input) : input;

    // Opcional: si el date es inválido, maneja error
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    // Formatear fecha en formato dd/mm/yyyy hora:minutos (24h)
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return date.toLocaleString('es-MX', options);
};

