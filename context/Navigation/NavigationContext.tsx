'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextProps {
    currentRoute: string;
    previousRoute: string | null;
    historyStack: string[];
    canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextProps>({
    currentRoute: '',
    previousRoute: null,
    historyStack: [],
    canGoBack: false
});

const IGNORED_PARAMS = ['sellId'];

const getFilteredSearchParams = (params: URLSearchParams): string => {
    const filtered = new URLSearchParams();

    for (const [key, value] of params.entries()) {
        if (!IGNORED_PARAMS.includes(key)) {
            filtered.append(key, value);
        }
    }

    return filtered.toString();
};

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filteredSearch = getFilteredSearchParams(searchParams);
    const fullPath = `${pathname}${filteredSearch ? `?${filteredSearch}` : ''}`;

    const [historyStack, setHistoryStack] = useState<string[]>([]);

    // Stack control: evita duplicados de pathname, actualiza si solo cambian filtros
    useEffect(() => {
        setHistoryStack(prev => {
            const lastEntry = prev[prev.length - 1];
            const lastPathname = lastEntry?.split('?')[0];
            const currentPathname = fullPath.split('?')[0];

            if (lastPathname === currentPathname) {
                // Reemplaza si es la misma pantalla pero diferente filtro
                const updatedStack = [...prev];
                updatedStack[updatedStack.length - 1] = fullPath;
                return updatedStack;
            }

            return [...prev, fullPath];
        });
    }, [fullPath]);

    const previousRoute = historyStack.length >= 2 ? historyStack[historyStack.length - 2] : null;

    return (
        <NavigationContext.Provider
            value={{
                currentRoute: fullPath,
                previousRoute,
                historyStack,
                canGoBack: historyStack.length > 1
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationContext = () => useContext(NavigationContext);
