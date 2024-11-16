"use client";
import React, { useState } from 'react';
import styles from '../../styles/Navigation.module.scss'
import FiltersComponent from '../UI/FiltersComponent';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

interface HeaderInterface {
    title: string
}

export default function Header({
    title
}: HeaderInterface) {

    const [openModal, setOpenModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false)

    const handleOpenModalFilters = () => {
        setopenModalBackground(!openModalBackground);
        setOpenModal(!openModal)
    };

    const onSelectFilterValue = (value: string, value2: string | undefined) => {
        if (!value) return;
        console.log({ value, value2 });
    };

    useLockBodyScroll(openModal);

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.header__title}>{title}</h2>
                <div className={styles.filters}>
                    <FiltersComponent
                        open={openModal}
                        onOpenFilters={handleOpenModalFilters}
                        filters={["uno", "dos"]}
                        onSelectFilter={onSelectFilterValue}
                    />
                </div>
            </div>
            {
                openModalBackground &&
                <div onClick={handleOpenModalFilters} className='backgroundModal'></div>
            }
        </>
    )
}
