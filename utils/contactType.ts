import { tipoContactoMap } from '@/services/bitacora/meeting.interface';
import MeetingInterface from '../interface/meeting';

export const contactType = (value: MeetingInterface['TipoContacto']) => {
  const typeContacto = tipoContactoMap[value];
  return typeContacto;
};
