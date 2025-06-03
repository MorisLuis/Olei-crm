export interface ParsedSellId {
    Id_Almacen: number;
    TipoDoc: number;
    Serie: string;
    Folio: string;
}

export function parseSellId(sellId: string): ParsedSellId | null {
    const parts = sellId?.split('-');
    if (parts.length < 4) return null;

    const [Id_Almacen, TipoDoc, Serie, Folio] = parts;

    if (isNaN(Number(Id_Almacen)) || isNaN(Number(TipoDoc))) return null;

    return {
        Id_Almacen: Number(Id_Almacen),
        TipoDoc: Number(TipoDoc),
        Serie,
        Folio,
    };
}
