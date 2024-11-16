import { createContext } from 'react';

interface ContextProps {
    globalPathname: { value: string, pathname: string };
    handleUpdatePathname: (arg: string, arg2: string) => void;
}


export const SettingsContext = createContext({} as ContextProps );