export const getMonthYear = (date: Date): { month: number; year: number } => {
    const correctedDate = new Date(date);
    correctedDate.setDate(correctedDate.getDate() + 7);

    return {
        month: correctedDate.getMonth() + 1,
        year: correctedDate.getFullYear(),
    };
};