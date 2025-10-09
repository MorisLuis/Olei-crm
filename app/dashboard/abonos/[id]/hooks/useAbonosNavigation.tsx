import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useNavigationContext } from '@/context/Navigation/NavigationContext';
import { AbonosInterface } from '@/interface/abonos';

export const useAbonosNavigation = (): {
    navigateToCloseModal: () => void,
    navigateToBack: () => void,
    onSelectAbono: (item: AbonosInterface) => void
} => {

    const { push } = useRouter();
    const { currentRoute } = useNavigationContext();

    const navigateToCloseModal = useCallback(() => {
        const [pathname, search] = currentRoute.split('?');
        const params = new URLSearchParams(search);
        params.delete('Id_Almacen');
        params.delete('folio');
        const cleanRoute = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
        push(cleanRoute)
    }, [push, currentRoute]);

    const navigateToBack = (): void => {
        push("/dashboard/abonos");
    };

    const onSelectAbono = useCallback((item: AbonosInterface) => {
        const [pathname, search] = currentRoute.split('?');
        const params = new URLSearchParams(search);

        // Agrega o actualiza los parámetros
        params.set('Id_Almacen', item.Id_Almacen.toString());
        params.set('folio', item.Folio.toString());

        // Construye la nueva URL
        const newRoute = `${pathname}?${params.toString()}`;
        push(newRoute);
    }, [push, currentRoute]);

    return {
        navigateToCloseModal,
        navigateToBack,
        onSelectAbono
    };
};
