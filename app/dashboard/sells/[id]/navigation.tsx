import { SellsInterface } from "@/interface/sells"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ExecuteNavigationSellsByClientInterface {
    Id_Cliente: string;
}

export const ExecuteNavigationSellsByClient = ({
    Id_Cliente,
} : ExecuteNavigationSellsByClientInterface ) => {

    const { push, back } = useRouter();

    const navigateToSellDetails  = useCallback((item: SellsInterface) => {
        if (!item.UniqueKey || !Id_Cliente) return;
        push(`/dashboard/sells/${Id_Cliente}/?sellId=${item.UniqueKey}`);
    }, [Id_Cliente, push]);



    const navigateToBack = () => {
        push('/dashboard/sells')
    };

    const navigateToBackModal = () => {
        back()
    }

    return {
        navigateToSellDetails,
        navigateToBack,
        navigateToBackModal
    }
}