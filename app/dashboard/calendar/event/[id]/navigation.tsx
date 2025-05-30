import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const ExecuteNavigationEventClient = (): {
  navigateToBack: () => void,
  navigateBackFromModalSells: () => void,
  navigateToModalSells: () => void,
  openModalSells: boolean,
  navigateCloseModalSecondary: () => void
} => {

  const { push, back } = useRouter();
  const [openModalSells, setOpenModalSells] = useState(false);

  const navigateBackFromModalSells = (): void => {
    const fullPath = window.location.pathname;
    push(fullPath);
    setOpenModalSells(false);
  };

  const navigateToModalSells = (): void => {
    setOpenModalSells(true);
  };

  const navigateToBack = (): void => {
    //push('/dashboard/calendar');
    back()
  };

  const navigateCloseModalSecondary = (): void => {
    const fullPath = window.location.pathname;
    push(fullPath);
  };

  return {
    navigateToBack,
    navigateBackFromModalSells,
    navigateToModalSells,
    openModalSells,
    navigateCloseModalSecondary,
  };
};
