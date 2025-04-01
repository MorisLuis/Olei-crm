export const dateValidation = (date: Date | string): boolean => {
  // Asegurarse de que sea un string
  const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0];

  // Expresión regular para validar el formato YYYY-MM-DD
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  return regex.test(dateString);
};

export const hourValidation = (hour: string): boolean => {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(hour);
};

export const emailValidation = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
