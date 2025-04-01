import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SellsInterface } from '@/interface/sells';

interface ExecuteNavigationSellsByClientInterface {
  Id_Cliente: string;
}

export const ExecuteNavigationSellsByClient = ({
  Id_Cliente,
}: ExecuteNavigationSellsByClientInterface): {
  navigateToSellDetails: (item: SellsInterface) => void,
  navigateToBack: () => void,
  navigateToBackModal: () => void
} => {

  const { push, back } = useRouter();

  const navigateToSellDetails = useCallback(
    (item: SellsInterface) => {
      if (!item.UniqueKey || !Id_Cliente) return;
      push(`/dashboard/sells/${Id_Cliente}/?sellId=${item.UniqueKey}`);
    }, [Id_Cliente, push]);

  const navigateToBack = () : void => {
    push('/dashboard/sells');
  };

  const navigateToBackModal = () : void => {
    back();
  };

  return {
    navigateToSellDetails,
    navigateToBack,
    navigateToBackModal,
  };
};
