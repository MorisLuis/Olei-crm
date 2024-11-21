"use client";

import React, { useState } from 'react';
import FiltersComponent from '../UI/FiltersComponent';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { Tag } from '../UI/Tag';
import OrderComponent, { OrderObject } from '../UI/OrderComponent';
import { FilterData, FilterObject } from '@/hooks/Filters/useFilters';
import { FilterSectionType } from '@/seed/Filters/FiltersSells';
import styles from '../../styles/Navigation.module.scss'
import InputSearch from '../Inputs/inputSearch';

interface HeaderInterface {

    //Filters
    filters?: FilterSectionType[];
    filterActive?: string[]

    filtersOfSection?: FilterData[];
    onSelectFilter?: ({ filterObject, filterType }: { filterObject?: FilterObject, filterType: string }) => void;
    onDeleteFilter?: (filter: string) => void;
    filtersActive?: FilterObject[];

    //Order
    orderSells: OrderObject[];
    onSelectOrder: (value: string | number) => void;
    orderActive: OrderObject

    onSearch?: (value: string) => void;
}

export default function HeaderTable({
    filters,
    filterActive,
    filtersOfSection,
    filtersActive,
    onSelectFilter,
    onDeleteFilter,
    orderSells,
    onSelectOrder,
    orderActive,
    onSearch
}: HeaderInterface) {

    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false);
    const filterVisible = filters && filtersOfSection && onSelectFilter && filtersActive;

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
                    filterVisible ?
                    <div className={styles.filters}>
                        <FiltersComponent
                            open={openFilterModal}
                            onOpenFilters={handleOpenModalFilters}
                            filterSections={filters}
                            onSelectFilter={onSelectFilter}
                            filtersOfSection={filtersOfSection}
                            filtersActive={filtersActive}
                        />
                        {
                            filterActive?.map((item, index) => <Tag key={index} close color='yellow' onClose={() => onDeleteFilter?.(item)}>{item}</Tag>)
                        }
                    </div>
                    :
                    <></>
                }

                {onSearch && <InputSearch onSearch={onSearch}/>}

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
