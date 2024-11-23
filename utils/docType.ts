import { SellsInterface } from '@/interface/sells';

export const docType = (value: SellsInterface['TipoDoc']) => {

    let type = "Cotizacion"

    if ( value === 1) type = "Cotizacion"
    if ( value === 2) type = "Factura"
    if ( value === 3) type = "Remisión"

    return type
}