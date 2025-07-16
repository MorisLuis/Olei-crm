import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { postEmailCobranza } from '@/services/email/email.service';
import { AuthContext, AuthContextProps } from '@/context/auth/AuthContext';
import ShareCobranzaModal, { ShareCobranzaModalInterface } from '@/app/dashboard/cobranza/[id]/cobranzaClientShareModal';

// 🧠 Mocks para next/navigation
jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ id: '108' })), // Simula que estás en la ruta /cobranza/108
    useSearchParams: jest.fn(() => ({
        get: (key: string) => {
            if (key === 'Id_Almacen') return '1';
            return null;
        },
    })),
}));

// 🧠 Mock del servicio de correo
jest.mock('@/services/email/email.service', () => ({
    postEmailCobranza: jest.fn().mockResolvedValue({}),
}));

// 🧠 Mock del hook de toast
jest.mock('@/hooks/useToast', () => () => ({
    showPromise: jest.fn(),
}));

// 🧠 Datos mock del contexto de autenticación
const mockAuthContext: AuthContextProps = {
    user: {
        Id: '123',
        Nombre: 'Juan Tester',
        Vigencia: '',
        TipoUsuario: '',
        Id_Almacen: 0,
        Id_Usuario: 'u123',
        from: 'crm',
        CorreoVtas: '',
        Id_Cliente: 999,
        Id_UsuarioOOL: '',
    },
    isLoggedIn: true,
    loggingIn: false,
    modalBackgroundOpen: false,
    loginUser: jest.fn(),
    logoutUser: jest.fn(),
    openModalBackground: jest.fn(),
};

// 🛠️ Helper para renderizar con contexto
const renderWithContext = (propsOverride = {}) => {
    const defaultProps: ShareCobranzaModalInterface = {
        visible: true,
        onClose: jest.fn(),
        email: 'cliente@email.com',
        clientName: 'Cliente XYZ',
        filters: {
            FilterExpired: 0,
            FilterNotExpired: 0,
            TipoDoc: 2,
            DateExactly: '',
            DateStart: '',
            DateEnd: '',
            cobranzaOrderCondition: '',
            termSearch: '',
        },
    };

    return render(
        <AuthContext.Provider value={mockAuthContext}>
            <ShareCobranzaModal
                {...defaultProps}
                {...propsOverride}
            />
        </AuthContext.Provider>
    );
};

describe('ShareCobranzaModal', () => {
    it('renders the modal with correct content', () => {
        renderWithContext();
        expect(screen.getByText('Compartir PDF')).toBeInTheDocument();
        expect(screen.getByText(/Compartir con/i)).toBeInTheDocument();
    });

    it('disables the button when no email is provided', () => {
        renderWithContext({ email: '' });
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('calls postEmailCobranza with correct data when clicking button', async () => {
        const mockOnClose = jest.fn();
        renderWithContext({ onClose: mockOnClose });

        const button = screen.getByText('Compartir PDF');
        fireEvent.click(button);

        await waitFor(() => {
            expect(postEmailCobranza).toHaveBeenCalledWith(expect.objectContaining({
                destinatario: 'cliente@email.com',
                remitente: 'Juan Tester',
                nombreRemitente: 'Cliente XYZ',
                subject: 'Relacion de cobranza',
                filters: {
                    FilterExpired: 0,
                    FilterNotExpired: 0,
                    TipoDoc: 2,
                    DateExactly: '',
                    DateStart: '',
                    DateEnd: '',
                    cobranzaOrderCondition: '',
                    termSearch: '',
                },
                Id_Cliente: 108, // viene del mock de useParams
                Id_Almacen: 1,   // viene del mock de searchParams
                PageNumber: 1,
            }));
        });

        expect(mockOnClose).toHaveBeenCalled();
    });
});
