'use client';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/dom/useClickOutside';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';
import { FilterBarInputs } from './FilterBarInputs';
import { FilterResponse, filterBarValues } from './FilterBarValues';

export interface FilterItemConfig {
    key: string;
    label: string;
    type: 'select' | 'input' | 'date' | 'radio' | 'date-range';
    inputType?: string;
    options?: { label: string; value: string | number, activeValue?: string }[];
    children?: FilterItemConfig[];
}

interface FilterBarProps<T extends string, V = string | number> {
    filters: Record<T, string | number | undefined>;
    config: FilterItemConfig[];
    updateFilter: (key: T, value: V) => void;
    updateFilters: (updates: Partial<Record<T, V>>) => void;
    removeFilter: (key: T) => void;
    removeFilters: (key: T[]) => void;
}

const FilterBar = <T extends string = string>({
    filters,
    config,
    updateFilter,
    updateFilters,
    removeFilter,
    removeFilters
}: FilterBarProps<T>): JSX.Element => {

    const [openModalKey, setOpenModalKey] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleModal = (key: string): void => {
        setOpenModalKey(prev => (prev === key ? null : key));
    };

    const handleRemoveFilter = (filter: FilterItemConfig, values: string | number | null): void => {
        if (filter.key === 'DateRange') {
            removeFilters(['DateStart', 'DateEnd', 'DateExactly'] as T[])
        } else {
            removeFilter(values as T)
        }
    };

    const hasAtLeastTwoValidFilters = (): boolean => {
        const count = Object.values(filters).filter(
            value => value !== '' && value !== 0 && value !== undefined
        ).length;
        return count >= 2;
    }

    const renderModal = (filter: FilterItemConfig): JSX.Element => {
        return (
            <>
                {openModalKey === filter.key && (
                    <div className={styles.filterModal} ref={dropdownRef}>
                        <div className={styles.label}>Filtrar por {filter.label}</div>
                        <FilterBarInputs
                            filter={filter}
                            filters={filters}
                            updateFilter={updateFilter}
                            updateFilters={updateFilters}
                            toggleModal={toggleModal}
                        />
                    </div>
                )}
            </>
        )
    };

    const renderFilter = (filter: FilterItemConfig, isActive: boolean, values: FilterResponse): JSX.Element => {
        return (
            <div style={{ display: 'flex' }}>

                {isActive && (
                    <button
                        className={`${styles.filterButton} ${styles.icon}`}
                        onClick={() => handleRemoveFilter(filter, values.keyValue)}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
                    </button>
                )}

                <button
                    className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
                    onClick={() => toggleModal(filter.key)}
                >
                    {filter.label}
                    {values.value && (
                        <span className={styles.value}> | {values.value}</span>
                    )}
                </button>
            </div>
        )
    };

    useClickOutside(dropdownRef, () => setOpenModalKey(null));

    return (
        <div className={styles.filtersComponent}>
            <div className={styles.filtersWrapper}>
                {config.map((filter) => {
                    const values = filterBarValues({ config: filter, filters });
                    const isActive = values.active;

                    return (
                        <div key={filter.key} className={styles.filterItem}>

                            {/* FILTER */}
                            {renderFilter(filter, isActive, values)}

                            {/* MODAL */}
                            {renderModal(filter)}

                        </div>
                    );
                })}

                {
                    hasAtLeastTwoValidFilters() &&
                    <div className={styles.filterItem} onClick={() => removeFilters(Object.keys(filters) as T[])}>
                        <p className={styles.filterClear}>Limpiar filtros</p>
                    </div>
                }
            </div>
        </div>

    );
};

export default FilterBar;
