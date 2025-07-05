
// utils/dateRange.ts
export function getCurrentMonthRange() {
    const now = new Date(); // Local TZ (America/Monterrey)

    // Primer día (día 1)
    const first = new Date(now.getFullYear(), now.getMonth(), 1);

    // Último día: día 0 del mes siguiente
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // ⚠️ Normalizamos a ISO-8601 (YYYY-MM-DD) sin zona horaria
    const toISODate = (d: Date) => d.toISOString().substring(0, 10);

    return {
        DateStart: toISODate(first),
        DateEnd: toISODate(last),
    };
}