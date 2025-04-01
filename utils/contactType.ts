import MeetingInterface, { tipoContactoMap } from '../interface/meeting';

export const contactType = (value: MeetingInterface['TipoContacto']) => {
  const typeContacto = tipoContactoMap[value];
  return typeContacto;
};
