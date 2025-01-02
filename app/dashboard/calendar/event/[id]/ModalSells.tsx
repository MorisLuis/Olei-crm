"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SellDetails from '@/app/dashboard/sells/[id]/[sellId]/SellDetails';
import ModalDouble from '@/components/Modals/ModalDouble';
import TableSecondary, { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { TimelineInterface } from '@/interface/calendar';
import { formatDate } from '@/utils/formatDate';

interface ModalSellsInterface {
    visible: boolean;
    onClose: () => void;
    sellEvents: TimelineInterface[];
    onCloseModalSecondary: () => void;
}

export default function ModalSells({
    visible,
    onClose,
    sellEvents,
    onCloseModalSecondary
}: ModalSellsInterface) {

    const [openSecondModal, setOpenSecondModal] = useState(false);
    const { push, back } = useRouter();

    const handleSelectItem = (item: TimelineInterface) => {
        push(`?sellId=${item.Id_Sell}`);
        setOpenSecondModal(true);
    }

    const handleCloseModalDouble = () => {
        setOpenSecondModal(false);
        onClose();
    }

    const handleCloseModalSecondary = ( ) => {
        onCloseModalSecondary()
        setOpenSecondModal(false)
    }

    const renderChildrenSecondModal = () => {
        return <SellDetails />
    }

    const columnsTimelineSells: ColumnSecondaryConfig<TimelineInterface>[] = [
        {
            key: 'Folio',
            label: 'Folio',
            render: (Folio) => <div><span style={{ fontWeight: 'bold' }}>Folio: </span>{Folio?.toString()}</div>
        },
        {
            key: 'Titulo',
            label: 'Titulo',
            render: (Title) => <div>{Title?.toString()}</div>
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (Fecha) => <div><span style={{ fontWeight: 'bold' }}>Fecha: </span>{formatDate(Fecha as Date)}</div>
        }
    ];

    return (
        <ModalDouble
            title='Documentos del dia.'
            visible={visible}
            visibleSecondModal={openSecondModal}
            onClose={handleCloseModalDouble}
            onCloseSecondModal={handleCloseModalSecondary}
            childrenSecondModal={renderChildrenSecondModal()}
        >
            <p className='instruction'>Selecciona uno para ver detalles.</p>
            <TableSecondary
                data={sellEvents}
                columns={columnsTimelineSells}
                loadingMoreData={true}
                noMoreData={true}
                onClick={handleSelectItem}
            />
        </ModalDouble>
    )
}
