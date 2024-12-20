"use client";
import { ReactNode, useEffect, useState } from "react"
import { SettingsContext } from "./SettingsContext"
import { usePathname } from "next/navigation";
import { screenData } from "@/database/screens";

export const SettingsProvider = ({ children }: { children: ReactNode }) => {

    const [globalPathname, setGlobalPathname] = useState<string>('');
    const [firtRenderCalendar, setFirtRenderCalendar] = useState(true)
    const pathname = usePathname();
    const basePath = pathname.split('/').filter(Boolean)[0];

    useEffect(() => {
        handleNavigateTitle()
    }, [pathname, basePath])

    const handleUpdatePathname = (value: string | undefined) => {
        const findPathname = screenData.find((item) => item.pathname === `/${basePath}`);
        const newBasePath = findPathname?.name ?? "Inicio"
        setGlobalPathname(`${newBasePath} ${value ? "/ " + value : ""}`)
    };

    const handleNavigateTitle = () => {
        const newTitle = screenData.find((item) => item.pathname === `/${basePath}`);
        setGlobalPathname(newTitle?.name ?? 'Inicio')
    }


    const handleRenderCalendar = (value: boolean) => {
        setFirtRenderCalendar(value);
    }

    return (
        <SettingsContext.Provider value={{
            globalPathname,
            handleUpdatePathname,
            firtRenderCalendar,
            handleRenderCalendar
        }}>
            {children}
        </SettingsContext.Provider>
    )
}