/**
 * Limpia un número de teléfono dejándolo solo con los últimos 10 dígitos.
 * Elimina espacios, guiones, paréntesis y cualquier otro caracter no numérico.
 *
 * @param phone Número de teléfono crudo (con o sin formato)
 * @returns Número limpio de 10 dígitos (sin código de país)
 */

export const cleanPhoneNumber = (phone: string): string => {
    let cleaned = phone.trim().replace(/[^0-9]/g, '');

    if (cleaned.length > 10) {
        cleaned = cleaned.slice(-10);
    }

    return cleaned;
};
