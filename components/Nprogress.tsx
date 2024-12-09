'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';

const NProgressComponent = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Inicia el progreso cuando se detecta un cambio de ruta
        NProgress.start();

        // Detiene el progreso después de un breve retraso
        const timeout = setTimeout(() => {
            NProgress.done();
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [pathname]); // Reacciona a cambios en el pathname

    return null;
};

export default NProgressComponent;
