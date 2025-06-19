import { useEffect } from 'react';

/**
 * Hook que ejecuta una función cuando haces clic fuera del elemento referenciado.
 *
 * @param ref - Referencia al elemento que quieres monitorear.
 * @param callback - Función que se ejecuta cuando se hace clic fuera.
 */

export const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) => {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
