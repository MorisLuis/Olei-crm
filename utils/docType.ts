import { tipoDocMap } from '@/hooks/Filters/useFiltersSellsConfig';
import { typeTipoDoc } from '@/interface/sells';

export const docType = (value: typeTipoDoc ) => {
    return tipoDocMap[value] || "Otro"; 
}
