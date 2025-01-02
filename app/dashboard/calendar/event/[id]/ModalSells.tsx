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
}

export default function ModalSells({
    visible,
    onClose,
    sellEvents
}: ModalSellsInterface) {

    const [openSecondModal, setOpenSecondModal] = useState(false);
    const { push } = useRouter();

    const handleSelectItem = (item: TimelineInterface) => {
        push(`?sellId=${item.Id_Sell}`);
        setOpenSecondModal(true);
    }

    const handleCloseModalDouble = () => {
        setOpenSecondModal(false);
        onClose();
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
            onCloseSecondModal={() => setOpenSecondModal(false)}
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
