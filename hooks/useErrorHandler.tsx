'use client';

import { useCallback, useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import useToast from './useToast';

export interface ErrorResponse {
  response?: {
    status?: number;
    config?: {
      method?: string;
    };
    data?: {
      error?: string;
      message?: string;
    };
  };
  message?: string;
}

export const useErrorHandler = () => {
  const { logoutUser } = useContext(AuthContext);
  const { showError } = useToast();

  const handleError = useCallback((async (error: ErrorResponse) => {
    // Accede de forma segura a las propiedades de error
    const status = error.response?.status;
    const method = error.response?.config?.method;

    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      error.message ??
      'Unknown error';

    if (status === 401) {
      return await logoutUser?.();
    }

    /* await sendError({
            From: `web/${user?.Id_UsuarioOOL?.trim()}`,
            Message: message,
            Id_Usuario: user?.Id_UsuarioOOL?.trim(),
            Metodo: method || '',
            code: (status as string)?.toString()
        }); */

    if (status) {
      /* switch (status) {
                case 404:
                    router.push('/404');
                    break;
                case 403:
                    router.push('/login');
                    break;
                case 500:
                    router.push('/500');
                    break;
                default:
                    router.push('/404');
                    break;
            } */
    } else {
      showError('Algo salió mal!');
    }
  }), [])

  return { handleError };
};

export default useErrorHandler;
