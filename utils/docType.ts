import { tipoDocMap, typeTipoDoc } from '@/interface/sells';

export const docType = (value: typeTipoDoc ) => {
    return tipoDocMap[value] || "Otro"; 
}
