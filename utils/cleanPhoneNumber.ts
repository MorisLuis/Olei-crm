export const cleanPhoneNumber = (phone: string): string => {
    let cleaned = phone.trim().replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    // Si el número empieza con un prefijo de lada, eliminamos el código del país (que tiene 2 dígitos en este caso)
    if (cleaned.length > 10) {
        cleaned = cleaned.slice(-10); // Quedarnos solo con los últimos 10 dígitos
    }
    return cleaned;
};