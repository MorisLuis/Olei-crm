"use client";

import { useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/api/api';
import useToast from '@/hooks/useToast';
import { UserCRMInterface } from '@/interface/user';
import { ApiError } from '@/interface/error';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export interface AuthState {
    isLoggedIn: boolean;
    user: UserCRMInterface;
}

export const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: {
        Id: '',
        Nombre: '',
        Vigencia: '',
        TipoUsuario: '',
        Id_Almacen: 0,
        Id_Usuario: '',
        from: 'crm',
    }
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const [loggingIn, setLoggingIn] = useState(false);
    const [modalBackgroundOpen, setModalBackgroundOpen] = useState(false)
    const { push } = useRouter();
    const pathname = usePathname();

    const { showError } = useToast()

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {

        if (pathname === "/login") return;

        try {
            const { data } = await api.get('/api/auth/renewWeb');
            Cookies.set('token', data.token);
            dispatch({ type: '[Auth] - Login', payload: data.user });
        } catch (error) {
            Cookies.remove('token');
            setLoggingIn(false)
            logoutUser()
        }
    }

    const loginUser = async (email: string, password: string) => {
        setLoggingIn(true);
        try {
            const data = await api.post('/api/auth/loginWeb', { email, password });
            const { token, user } = data.data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            push('/clients')
            
        } catch (error : unknown) {
            const apiError = error as ApiError;            
            // Accede de forma segura al mensaje de error dentro de `errors`
            const message = apiError.response?.data?.errors?.[0]?.message ?? "An unexpected error occurred";
            showError(message)
            setLoggingIn(false);
        }
    };
    

    const logoutUser = async () => {
        try {
            await api.get('/api/auth/logout');
            push("/login")
            Cookies.remove("token")
            dispatch({ type: '[Auth] - Logout', user: AUTH_INITIAL_STATE.user });
        } catch (error) {
            push("/login")
            Cookies.remove("token")
        } finally {
            setLoggingIn(false);
        }
    }

    const openModalBackground = () => {
        setModalBackgroundOpen(!modalBackgroundOpen)
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            loggingIn,
            modalBackgroundOpen,

            // Methods
            loginUser,
            logoutUser,
            openModalBackground
        }}>
            {children}
        </AuthContext.Provider>

    )
};