"use client";

import React, { useState } from 'react';
import FiltersComponent, { FilterData, FilterObject } from '../UI/FiltersComponent';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { Tag } from '../UI/Tag';
import styles from '../../styles/Navigation.module.scss'
import OrderComponent, { OrderObject } from '../UI/OrderComponent';

interface HeaderInterface {

    //Filters
    filters?: { value: string, label: string }[];
    filterActive?: string[]
    filtersOfSection?: FilterData[];
    onSelectFilter?: (filterObject: FilterObject, filterType: string) => void;
    onDeleteFilter?: (filter: string) => void;

    //Order
    orderSells: OrderObject[];
    onSelectOrder: (value: string | number) => void;
    orderActive: OrderObject
}

export default function HeaderTable({
    filters,
    filterActive,
    filtersOfSection,
    onSelectFilter,
    onDeleteFilter,
    orderSells,
    onSelectOrder,
    orderActive
}: HeaderInterface) {

    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false);
    const filterVisible = filters && onSelectFilter && filtersOfSection;

    const handleOpenModalFilters = () => {
        setopenModalBackground(!openModalBackground);
        setOpenFilterModal(!openFilterModal)
    };

    const handleOpenModalOrders = () => {
        setopenModalBackground(!openModalBackground);
        setOpenOrderModal(!openOrderModal)
    };

    const handelCloseBackground = () => {
        setopenModalBackground(false);
        setOpenFilterModal(false);
        setOpenOrderModal(false);
    }

    useLockBodyScroll(openFilterModal);

    return (
        <>
            <div className={styles.headerTable}>
                {
                    filterVisible &&
                    <div className={styles.filters}>
                        <FiltersComponent
                            open={openFilterModal}
                            onOpenFilters={handleOpenModalFilters}
                            filterSections={filters}
                            onSelectFilter={onSelectFilter}
                            filtersOfSection={filtersOfSection}
                        />
                        {
                            filterActive?.map((item, index) => <Tag key={index} close color='yellow' onClose={() => onDeleteFilter?.(item)}>{item}</Tag>)
                        }
                    </div>
                }

                <OrderComponent
                    open={openOrderModal}
                    orderOptions={orderSells}
                    onOpenOrder={handleOpenModalOrders}
                    onSelectOrder={onSelectOrder}
                    orderActive={orderActive}
                />
            </div>

            {
                openModalBackground &&
                <div onClick={handelCloseBackground} className='backgroundModal'></div>
            }
        </>
    )
}
