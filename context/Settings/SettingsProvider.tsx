"use client";
import { ReactNode, useState } from "react"
import { SettingsContext } from "./SettingsContext"


export const SettingsProvider = ({ children }: { children: ReactNode }) => {

    const [globalPathname, setGlobalPathname] = useState<{ value: string, pathname: string }>({ value: '', pathname: '' });

    const handleUpdatePathname = (value: string, pathname: string) => {

        setGlobalPathname({
            value: value,
            pathname: pathname
        })
    }

    return (
        <SettingsContext.Provider value={{
            globalPathname,
            handleUpdatePathname
        }}>
            {children}
        </SettingsContext.Provider>
    )
}