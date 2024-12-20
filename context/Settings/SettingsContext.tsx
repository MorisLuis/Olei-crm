import { createContext } from 'react';

interface ContextProps {
    globalPathname: string;
    handleUpdatePathname: (arg: string | undefined ) => void;
    firtRenderCalendar: boolean;
    handleRenderCalendar: (value: boolean) => void;
}


export const SettingsContext = createContext({} as ContextProps );