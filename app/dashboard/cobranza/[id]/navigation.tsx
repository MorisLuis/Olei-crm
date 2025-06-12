import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useNavigationContext } from '@/context/Navigation/NavigationContext';
import { SellsInterface } from '@/interface/sells';

interface ExecuteNavigationCobranzaResponse {
  navigateToCloseModal: () => void;
  navigateToBack: () => void;
  onSelectItem: (item: SellsInterface) => void;
}

export const useCobranzaNavigation = (): ExecuteNavigationCobranzaResponse => {

  const { push } = useRouter();
  const { previousRoute, currentRoute } = useNavigationContext();

  const navigateToCloseModal = useCallback(() => {
    const [pathname, search] = currentRoute.split('?');
    const params = new URLSearchParams(search);
    params.delete('sellId');
    const cleanRoute = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    push(cleanRoute)
  }, [currentRoute, push]);

  const navigateToBack = useCallback(() => {
    if (previousRoute) {
      push(previousRoute);
    } else {
      push('/dashboard/cobranza');
    }
  }, [push, previousRoute]);

  const onSelectItem = useCallback((item: SellsInterface) => {
    push(`${currentRoute}&sellId=${item.UniqueKey}`)
  }, [push, currentRoute]);

  return {
    navigateToCloseModal,
    navigateToBack,
    onSelectItem
  };
};
