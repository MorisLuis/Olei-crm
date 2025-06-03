import { typeTipoDoc } from "@/services/sells/sells.interface";
import { TipoDoc } from "../constants/cobranza";

export const isValidTipoDoc = (value: number): value is typeTipoDoc => {
    const validTipoDoc: typeTipoDoc[] = TipoDoc;
    return validTipoDoc.includes(value as typeTipoDoc);
};
