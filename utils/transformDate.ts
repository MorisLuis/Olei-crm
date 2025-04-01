export const transformDate = (date: Date) => {
  if (!(date instanceof Date)) {
    throw new Error('El argumento debe ser un objeto Date.');
  }
  return date.toISOString().split('T')[0];
};
