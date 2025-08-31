import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const ExecuteNavigationEventClient = (): {
  navigateToBack: () => void,
  navigateBackFromModalSells: () => void,
  navigateToModalSells: () => void,
  openModalSells: boolean,
} => {

  const { back } = useRouter();
  const [openModalSells, setOpenModalSells] = useState(false);

  const navigateBackFromModalSells = (): void => {
    setOpenModalSells(false);
  };

  const navigateToModalSells = (): void => {
    setOpenModalSells(true);
  };

  const navigateToBack = (): void => {
    back()
  };

  return {
    navigateToBack,
    navigateBackFromModalSells,
    navigateToModalSells,
    openModalSells,
  };
};
