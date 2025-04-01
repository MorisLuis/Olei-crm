import React, { useState } from 'react';
import ModalDouble from '@/components/Modals/ModalDouble';

interface ModalSellsInterface {
  visible: boolean;
  onClose: () => void;
}

export default function ModalSells({ visible, onClose }: ModalSellsInterface)  : JSX.Element {
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const renderChildrenSecondModal = () : JSX.Element => {
    return (
      <div>
        <p>Segundo modal</p>
      </div>
    );
  };

  return (
    <ModalDouble
      title="Doble"
      visible={visible}
      visibleSecondModal={openSecondModal}
      onClose={onClose}
      onCloseSecondModal={() => setOpenSecondModal(false)}
      childrenSecondModal={renderChildrenSecondModal()}
    >
      <p>Modal doble</p>
      <button onClick={() => setOpenSecondModal(true)}>abri segundo</button>
    </ModalDouble>
  );
}
