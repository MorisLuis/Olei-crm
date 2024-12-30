import { SellsInterface } from "@/interface/sells"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ExecuteNavigationCobranzaInterface {
    Id_Cliente: string;
}

export const ExecuteNavigationCobranza = ({
    Id_Cliente,
} : ExecuteNavigationCobranzaInterface ) => {

    const { push } = useRouter();

    const navigateToCobranza  = useCallback((item: SellsInterface) => {
        const { Id_Almacen, TipoDoc, Serie, Folio } = item;
        if(!Id_Almacen || !TipoDoc || !Serie || !Folio ) return;
        push(`/dashboard/cobranza/${Id_Cliente}?sellId=${item.UniqueKey}&Id_Almacen=${Id_Almacen}&TipoDoc=${TipoDoc}&Serie=${Serie}&Folio=${Folio}`)
    }, [Id_Cliente, push]);


    const navigateToBack = useCallback(() => {
        push(`${Id_Cliente}`)
    }, [])


    return {
        navigateToCobranza,
        navigateToBack
    
    }
}