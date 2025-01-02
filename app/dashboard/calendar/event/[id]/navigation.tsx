import { useRouter } from "next/navigation";
import {  useState } from "react";

export const ExecuteNavigationEventClient = ( ) => {

    const { push } = useRouter();
    const [openModalSells, setOpenModalSells] = useState(false)


    const navigateBackFromModalSells = () => {
        const fullPath = window.location.pathname;
        push(fullPath);
        setOpenModalSells(false)
    };

    const navigateToModalSells = () => {
        setOpenModalSells(true)
    };


    const navigateToBack = () => {
        push('/dashboard/calendar')
    };

    return {
        navigateToBack,
        navigateBackFromModalSells,
        navigateToModalSells,
        openModalSells
    }
}