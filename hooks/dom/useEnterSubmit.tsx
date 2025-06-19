// hooks/useEnterSubmit.ts
import { useCallback } from 'react';

export function useEnterSubmit(action: () => void) {
    return useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // opcional si no quieres que el form se envíe
            action();
        }
    }, [action]);
}
