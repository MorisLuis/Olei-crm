import ModalDouble from '@/components/Modals/ModalDouble'
import React, { useState } from 'react';

interface ModalSellsInterface {
    visible: boolean;
    onClose: () => void;
}

export default function ModalSells({
    visible,
    onClose
}: ModalSellsInterface) {

    const [openSecondModal, setOpenSecondModal] = useState(false)

    const renderChildrenSecondModal = () => {
        return (
            <div>
                <p>Segundo modal</p>
            </div>
        )
    }

    return (
        <ModalDouble
            title='Doble'
            visible={visible}
            visibleSecondModal={openSecondModal}
            onClose={onClose}
            onCloseSecondModal={() => setOpenSecondModal(false)}
            childrenSecondModal={renderChildrenSecondModal()}
        >
            <p>Modal doble</p>
            <button onClick={() => setOpenSecondModal(true)}>abri segundo</button>
        </ModalDouble>
    )
}
