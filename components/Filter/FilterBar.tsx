'use client';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/dom/useClickOutside';
import { FilterBarInputs } from './FilterBarInputs';
import { FilterResponse, filterBarValues } from './FilterBarValues';
import FilterBarSkeleton from '../Skeletons/navigation/FilterBarSkeleton';
import styles from './../../styles/Components/Filters.module.scss';

export interface FilterItemConfig {
    key: string;
    label: string;
    type: 'select' | 'input' | 'date' | 'radio' | 'date-range';
    modalLabel?: string;
    inputType?: string;
    options?: { label: string; value: string | number; activeValue?: string }[];
    children?: FilterItemConfig[];
}

type FilterBarProps<F extends Record<string, string | number | undefined>> = {
    filters: F;
    updateFilter: <K extends keyof F>(key: K, value: F[K]) => void;
    updateFilters: (updates: Partial<F>) => void;
    removeFilter: (key: keyof F) => void;
    removeFilters: (keys: (keyof F)[]) => void;

    config: FilterItemConfig[];
    isLoading: boolean;
};

const FilterBar = <F extends Record<string, string | number | undefined>>({
    filters,
    config,
    updateFilter,
    updateFilters,
    removeFilter,
    removeFilters,
    isLoading
}: FilterBarProps<F>): JSX.Element => {

    const [openModalKey, setOpenModalKey] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleModal = (key: string): void => {
        setOpenModalKey(prev => (prev === key ? null : key));
    };

    const handleRemoveFilter = (filter: FilterItemConfig): void => {
        if (filter.key === 'DateRange') {
            removeFilters(['DateStart', 'DateEnd', 'DateExactly'] as (keyof F)[]);
        } else {
            removeFilter(filter.key as keyof F);
        }
    };

    const hasAtLeastTwoValidFilters = (): boolean =>
        Object.values(filters).filter(v => v !== '' && v !== 0 && v !== undefined).length >= 2;

    const renderModal = (filter: FilterItemConfig): JSX.Element => (
        <>
            {openModalKey === filter.key && (
                <div className={styles.filterModal} ref={dropdownRef}>
                    <div className={styles.label}>{filter.modalLabel ?? filter.label}</div>

                    <FilterBarInputs
                        filter={filter}
                        filters={filters}
                        toggleModal={toggleModal}

                        updateFilter={updateFilter}
                        updateFilters={updateFilters}
                    />
                </div>
            )}
        </>
    );

    const renderFilterBtn = (
        filter: FilterItemConfig,
        isActive: boolean,
        values: FilterResponse
    ): JSX.Element => (
        <div style={{ display: 'flex' }}>
            {isActive && (
                <button
                    className={`${styles.filterButton} ${styles.icon}`}
                    onClick={() => handleRemoveFilter(filter)}
                >
                    <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
                </button>
            )}

            <button
                className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
                onClick={() => toggleModal(filter.key)}
            >
                {filter.label}
                {values.value && <span className={styles.value}> | {values.value}</span>}
            </button>
        </div>
    );

    useClickOutside(dropdownRef, () => setOpenModalKey(null));

    if (isLoading) {
        return (<FilterBarSkeleton />)
    }

    return (
        <div className={styles.filterBar}>
            <div className={styles.filtersWrapper}>
                <div className={styles.filtersWrapper__filters}>
                    {config.filter((item) => item.key !== 'orderField').map((filter: FilterItemConfig) => {
                        const values = filterBarValues({ config: filter, filters });
                        const isActive = values.active;

                        return (
                            <div key={filter.key} className={styles.filterItem}>
                                {/* BOTÓN / BADGE */}
                                {renderFilterBtn(filter, isActive, values)}
                                {/* MODAL */}
                                {renderModal(filter)}
                            </div>
                        );
                    })}

                    {hasAtLeastTwoValidFilters() && (
                        <div
                            className={styles.filterItem}
                            onClick={() => removeFilters(Object.keys(filters) as (keyof F)[])}
                        >
                            <p className={styles.filterClear}>Limpiar filtros</p>
                        </div>
                    )}
                </div>
                <div>
                    {config.filter((item) => item.key === 'orderField').map((filter: FilterItemConfig) => {
                        const values = filterBarValues({ config: filter, filters });
                        const isActive = values.active;

                        return (
                            <div key={filter.key} className={styles.filterItem}>
                                {/* BOTÓN / BADGE */}
                                {renderFilterBtn(filter, isActive, values)}
                                {/* MODAL */}
                                {renderModal(filter)}
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default FilterBar;
