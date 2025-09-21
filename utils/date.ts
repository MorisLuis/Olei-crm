// utils/date.ts
export function addMinutesToHour(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date.toTimeString().slice(0, 5);
}
