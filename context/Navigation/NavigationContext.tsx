'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationContextProps {
    currentRoute: string;
    previousRoute: string | null;
    canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextProps>({
    currentRoute: '',
    previousRoute: null,
    canGoBack: false,
});

const IGNORED_PARAMS = ['sellId'];

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getFilteredSearchParams = (params: URLSearchParams): string => {
        const filtered = new URLSearchParams();

        for (const [key, value] of params.entries()) {
            if (!IGNORED_PARAMS.includes(key)) {
                filtered.append(key, value);
            }
        }

        return filtered.toString();
    };

    const filteredSearch = getFilteredSearchParams(searchParams);
    const fullPath = `${pathname}${filteredSearch ? `?${filteredSearch}` : ''}`;

    const previousPathRef = useRef<string | null>(null);
    const [current, setCurrent] = useState<string>(fullPath);

    useEffect(() => {
        if (current !== fullPath) {
            previousPathRef.current = current;
            setCurrent(fullPath);
        }
    }, [fullPath]);

    return (
        <NavigationContext.Provider
            value={{
                currentRoute: `${pathname}?${searchParams.toString()}`,
                previousRoute: previousPathRef.current,
                canGoBack: previousPathRef.current !== null,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationContext = () => useContext(NavigationContext);
