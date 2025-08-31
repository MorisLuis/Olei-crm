
export const hourValidation = (hour: string): boolean => {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(hour);
};

export const emailValidation = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};