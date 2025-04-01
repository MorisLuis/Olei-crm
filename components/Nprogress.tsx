'use client';

import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect } from 'react';

const NProgressComponent = () : JSX.Element | null => {
  const pathname = usePathname();

  useEffect(() => {
    // Inicia el progreso cuando se detecta un cambio de ruta
    NProgress.start();

    // Detiene el progreso después de un breve retraso
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () : void => {
      clearTimeout(timeout);
    };
  }, [pathname]); // Reacciona a cambios en el pathname

  return null;
};

export default NProgressComponent;
