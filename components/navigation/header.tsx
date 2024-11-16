"use client";

import React, { useState } from 'react';
import FiltersComponent from '../UI/FiltersComponent';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/Navigation.module.scss'
import { usePathname, useRouter } from 'next/navigation';


interface HeaderInterface {
    title: string;
    filters: string[]
}

export default function Header({
    title,
    filters
}: HeaderInterface) {

    const router = useRouter()
    const [openModal, setOpenModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false);

    const pathname = usePathname();
    const [basePath, id] = pathname.split('/').filter(Boolean);
    console.log({ basePath, id })
    const goBack = () => router.back()

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
                <div className={styles.header__title}>
                    {
                        id &&
                        <FontAwesomeIcon
                            onClick={goBack}
                            icon={faArrowLeft}
                            className={`${styles.icon} icon__small`}
                        />
                    }
                    <h2>{title}</h2>
                </div>

                <div className={styles.filters}>
                    <FiltersComponent
                        open={openModal}
                        onOpenFilters={handleOpenModalFilters}
                        filters={filters}
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
