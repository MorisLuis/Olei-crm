

export default function isValidDate(dateStr: string): boolean {

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const [year, month, day] = dateStr.split('-').map(Number);

    // Validación básica de rango
    if (month < 1 || month > 12 || day < 1 || day > 31) return false;

    const date = new Date(year, month - 1, day); // evita string parsing

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}