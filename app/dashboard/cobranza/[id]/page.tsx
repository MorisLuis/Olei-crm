"use client";

import React, { useCallback, useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useOrderMeetingsConfig } from '@/hooks/Orders/useOrderMeetingsConfig';
import { useFiltersMeetingConfig } from '@/hooks/Filters/useFiltersMeetingsConfig';
import { useFilters } from '@/hooks/Filters/useFilters';
import TableCobranza from './TableCobranza';
import { sellsClientExample } from '@/seed/sellsData';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@/components/Modals/Modal';
import SellDetails from '@/app/dashboard/sells/[id]/[sellId]/SellDetails';
import { SellsInterface } from '@/interface/sells';
import ShareCobranzaModal from './ShareCobranzaModal';
import styles from "../../../../styles/pages/Cobranza.module.scss";

export default function Cobranza() {

    const { push, back } = useRouter()
    const pathname = usePathname();
    const id = pathname.split('/').filter(Boolean)[2];    

    const { orderMeetings } = useOrderMeetingsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderMeetings[0])
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersMeeting, filterOfMeetings } = useFiltersMeetingConfig();
    const [openModalSell, setOpenModalSell] = useState(false);
    const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false)

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Compartir Relación',
            onclick: () => setOpenModalShareCobranza(true),
            color: 'yellow'
        }
    ]

    // ESTO CAMBIA
    const totalSells = 2;
    const loadMoreProducts = async () => {
    }
    // TERMINA CAMBIO

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderMeetings.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const handleSelectItem = (item: SellsInterface) => {
        setOpenModalSell(true)
        push(`/dashboard/cobranza/${id}?sellId=${item.UniqueKey}`)
    }

    const handleCloseModalSell = () => {
        back()
        setOpenModalSell(false)
    };

    const handleCloseModalShareCobranza = () => {
        setOpenModalShareCobranza(false)
    }

    const executeQuery = useCallback(() => {
        const queryUrl = `/api/meetings&meetginOrderCondition=${orderActive.order}`;
        console.log({ query: queryUrl });
    }, [orderActive]);

    useEffect(() => {
        executeQuery()
    }, [executeQuery])

    return (
        <div className={styles.page}>
            <Header title='Cobranza' actions={clientActions} />
            <HeaderTable
                filters={filtersMeeting}
                filtersOfSection={filterOfMeetings}

                filterActive={filtersTag}
                filtersActive={filtersActive}
                onSelectFilter={onSelectFilterValue}
                onDeleteFilter={onDeleteFilter}

                orderSells={orderMeetings}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />

            <TableCobranza
                sells={sellsClientExample}
                totalSells={totalSells}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
                handleSelectItem={handleSelectItem}
            />

            <Modal
                visible={openModalSell}
                title='Detalle de venta'
                onClose={handleCloseModalSell}
                modalSize='medium'
            >
                <SellDetails />
            </Modal>

            <ShareCobranzaModal
                visible={openModalShareCobranza}
                onClose={handleCloseModalShareCobranza}
            />

        </div>
    )
}
