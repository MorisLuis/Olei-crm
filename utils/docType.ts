import { tipoDocMap, typeTipoDoc } from "@/services/sells/sells.interface";

export const docType = (value: typeTipoDoc) => {
  return tipoDocMap[value] || 'Otro';
};
