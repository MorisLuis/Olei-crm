import { createContext } from 'react';

interface ContextProps {
    globalPathname: string;
    handleUpdatePathname: (arg: string | undefined ) => void;
}


export const SettingsContext = createContext({} as ContextProps );