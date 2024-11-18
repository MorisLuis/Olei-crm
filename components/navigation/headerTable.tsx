"use client";

import React, { useState } from 'react';
import FiltersComponent, { FilterData, FilterObject } from '../UI/FiltersComponent';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { Tag } from '../UI/Tag';
import styles from '../../styles/Navigation.module.scss'


interface HeaderInterface {
    filters?: { value: string, label: string }[];
    filterActive?: string[]
    filtersOfSection?: FilterData[];
    onSelectFilter?: (filterObject: FilterObject, filterType: string) => void;
    onDeleteFilter?: (filter: string) => void;
}

export default function HeaderTable({
    filters,
    filterActive,
    filtersOfSection,
    onSelectFilter,
    onDeleteFilter
}: HeaderInterface) {

    const [openModal, setOpenModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false);

    const handleOpenModalFilters = () => {
        setopenModalBackground(!openModalBackground);
        setOpenModal(!openModal)
    };

    useLockBodyScroll(openModal);

    return (
        <>
            <div className={styles.headerTable}>
                {
                    (filters && onSelectFilter && filtersOfSection) &&
                    <div className={styles.filters}>
                        <FiltersComponent
                            open={openModal}
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
            </div>

            {
                openModalBackground &&
                <div onClick={handleOpenModalFilters} className='backgroundModal'></div>
            }
        </>
    )
}
