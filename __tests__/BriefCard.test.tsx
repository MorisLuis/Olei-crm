// __tests__/BriefCard.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BriefCard from '@/components/Cards/BriefCard';

const mockData = [
    { id: 1, label: 'Nombre', value: 'Juan' },
    { id: 2, label: 'Correo', value: 'juan@mail.com' },
];

describe('BriefCard', () => {
    /* it('renders loading state', () => {
        render(<BriefCard data={null} isLoading={true} />);
        expect(screen.getByText('Cargando...')).toBeInTheDocument();
    }); */

    it('renders no data state', () => {
        render(<BriefCard data={null} isLoading={false} />);
        expect(screen.getByText('No hay información.')).toBeInTheDocument();
        expect(
            screen.getByText('No se encontro información de este usuario')
        ).toBeInTheDocument();
    });

    it('renders with provided data and default header', () => {
        render(<BriefCard data={mockData} isLoading={false} />);
        expect(screen.getByText('Resumen')).toBeInTheDocument();
        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Juan')).toBeInTheDocument();
        expect(screen.getByText('Correo')).toBeInTheDocument();
        expect(screen.getByText('juan@mail.com')).toBeInTheDocument();
    });

    it('renders "Sin datos" when value is empty or "null"', () => {
        const mockDataWithMissingValue = [
            { id: 1, label: '', value: '' },
            { id: 2, label: '', value: '' },
        ];
        render(<BriefCard data={mockDataWithMissingValue} isLoading={false} />);
        const tags = screen.getAllByText('Sin datos');
        expect(tags.length).toBe(2);
    });

    it('renders custom header', () => {
        render(
            <BriefCard data={mockData} isLoading={false} header="Resumen" />
        );
        expect(screen.getByText('Resumen')).toBeInTheDocument();
    });
});
