/**
 * 
 * Validates if the given date is in 'YYYY-MM-DD' format.
 * @params date could be a Date object or a string in 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm:ss.sssZ' format   
 * @returns boolean
 * @throws Error if the date is not valid
 * @example dateValidation(new Date()) // true
 */

export const dateValidation = (date: Date | string): boolean => {

    let dateString: string;


    if (date instanceof Date) {
        // Convertir Date a 'YYYY-MM-DD'
        dateString = date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
        dateString = transformDate(date);
    } else {
        return false;
    }

    // Regular expression to validate 'YYYY-MM-DD' format
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    return regex.test(dateString);
};

const transformDate = (date: string): string => {
    let dateString;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)) {
        // If the date is in 'YYYY-MM-DDTHH:mm:ss.sssZ' format, convert it to 'YYYY-MM-DD'
        dateString = date.split('T')[0];
    } else {
        dateString = date;
    }

    return dateString
};