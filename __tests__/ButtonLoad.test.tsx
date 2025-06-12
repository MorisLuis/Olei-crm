import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonLoad from '@/components/Buttons/ButtonLoad';

describe('ButtonLoad', () => {
    it('should render button with default text and icon', () => {
        render(
            <ButtonLoad
                onClick={() => { }}
                loading={false}
                buttonText="Crear"
            />
        );

        const btn = screen.getByRole('button');
        expect(btn).toHaveTextContent('Crear');
        expect(btn).not.toBeDisabled();
        expect(btn.querySelector('svg')).toBeInTheDocument(); // El ícono
    });

    it('should render loading state', () => {
        render(
            <ButtonLoad
                onClick={() => { }}
                loading={true}
                buttonText="Crear"
                buttonTextLoading="Cargando..."
            />
        );

        const btn = screen.getByRole('button');
        expect(btn).toBeDisabled();
        expect(btn).toHaveTextContent('Cargando...');
        expect(btn.querySelector('svg')).not.toBeInTheDocument(); // Icono no se muestra
    });

    it('should call onClick when clicked', () => {
        const handleClick = jest.fn();

        render(
            <ButtonLoad
                onClick={handleClick}
                loading={false}
                buttonText="Crear"
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
        const handleClick = jest.fn();

        render(
            <ButtonLoad
                onClick={handleClick}
                loading={false}
                disabled={true}
                buttonText="Crear"
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});
