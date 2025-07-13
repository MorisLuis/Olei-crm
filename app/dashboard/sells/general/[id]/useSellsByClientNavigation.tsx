import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useNavigationContext } from '@/context/Navigation/NavigationContext';
import { SellsInterface } from '@/interface/sells';

export const useSellsByClientNavigation = (): {
  navigateToCloseModal: () => void,
  navigateToBack: () => void,
  onSelectSell: (item: SellsInterface) => void
} => {

  const { push } = useRouter();
  const { previousRoute, currentRoute } = useNavigationContext();

  const navigateToCloseModal = useCallback(() => {
    const [pathname, search] = currentRoute.split('?');
    const params = new URLSearchParams(search);
    params.delete('sellId');
    const cleanRoute = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
    push(cleanRoute)
  }, [push, currentRoute]);

  const navigateToBack = (): void => {
    if (previousRoute) {
      push(previousRoute);
    } else {
      push('/dashboard/sells/general');
    }
  };

  const onSelectSell = useCallback((item: SellsInterface) => {
    push(`${currentRoute}&sellId=${item.UniqueKey}`)
  }, [push, currentRoute]);

  

  return {
    navigateToCloseModal,
    navigateToBack,
    onSelectSell
  };
};
