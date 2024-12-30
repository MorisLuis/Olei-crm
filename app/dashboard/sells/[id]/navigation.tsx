import { SellsInterface } from "@/interface/sells"
import { useRouter } from "next/router";
import { useCallback } from "react";

interface ExecuteNavigationSellsByClientInterface {
    Id_Cliente: string;
    clientName: string;
}

export const ExecuteNavigationSellsByClient = ({
    Id_Cliente,
    clientName
} : ExecuteNavigationSellsByClientInterface ) => {

    const { push, back } = useRouter();

    const navigateToSellDetails  = useCallback((item: SellsInterface) => {
        if (!item.UniqueKey || !Id_Cliente) return;
        push(`/dashboard/sells/${Id_Cliente}/?sellId=${item.UniqueKey}`);
    }, [Id_Cliente, push]);



    const navigateToBack = () => {
        if(clientName === "Regresar") {
            push('/dashboard/sells')
        } else {
            back()
        }
    }

    return {
        navigateToSellDetails,
        navigateToBack
    }
}