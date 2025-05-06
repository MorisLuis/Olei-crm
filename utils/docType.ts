import { typeTipoDoc } from "@/services/sells/sells.interface";
import { tipoDocMap } from "./constants/sells";

export const docType = (value: typeTipoDoc) => {
  return tipoDocMap[value] || 'Otro';
};
