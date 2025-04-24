'use client';

import React, { useState } from 'react';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';

export interface FilterItemConfig {
    key: string;
    label: string;
    type: 'select' | 'input' | 'date' | 'radio' | 'date-range';
    inputType?: string;
    options?: { label: string; value: string | number }[];
    children?: FilterItemConfig[];  // Añadir children aquí para filtros tipo 'date-range'
}

interface FilterBarProps<T extends string = string> {
    filters: Record<T, string | number | undefined>;
    updateFilter: (key: T, value: string | number) => void;
    config: FilterItemConfig[];
    updateFilters: (updates: Partial<Record<T, string | number>>) => void;
}

const FilterBar = <T extends string = string>({
    filters,
    updateFilter,
    updateFilters,
    config,
}: FilterBarProps<T>): JSX.Element => {

    const [openModalKey, setOpenModalKey] = useState<string | null>(null);

    const toggleModal = (key: string): void => {
        setOpenModalKey(prev => (prev === key ? null : key));
    };

    const renderInput = (filter: FilterItemConfig): JSX.Element | null => {
        const value = filters[filter.key as T];

        switch (filter.type) {
            case 'select':
                return (
                    <select
                        className={styles.filterButton}
                        value={value ?? ''}
                        onChange={(e) => updateFilter(filter.key as T, e.target.value)}
                    >
                        {filter.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'input':
                return (
                    <input
                        type={filter.inputType || 'text'}
                        className={styles.filterButton}
                        value={value ?? ''}
                        onChange={(e) => updateFilter(filter.key as T, e.target.value)}
                    />
                );
            case 'date':
                return (
                    <>
                        <label className={styles.radioOption}>{filter.label}</label>
                        <input
                            type="date"
                            className={styles.filterButton}
                            value={value ?? ''}
                            onChange={(e) => updateFilter(filter.key as T, e.target.value)}
                        />
                    </>
                );
            case 'radio':
                return (
                    <div className={styles.radioGroup}>
                        {filter.options?.map((option) => (
                            <label key={option.value} className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name={filter.key}
                                    value={option.value}
                                    checked={filters[option.value as T] === 1}
                                    onChange={() => {
                                        const updates: Partial<Record<T, number>> = {};

                                        updates[option.value as T] = 1;
                                        filter.options?.forEach(opt => {
                                            if (opt.value !== option.value) {
                                                updates[opt.value as T] = 0;
                                            }
                                        });

                                        updateFilters(updates);
                                    }}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                );

            case 'date-range': // Este es el caso para manejar el 'date-range'
                return (
                    <div className={styles.dateRangeWrapper}>
                        {filter.children?.map((childFilter) => (
                            <div key={childFilter.key} className={styles.dateRangeItem}>
                                {renderInput(childFilter)} {/* Renderiza cada filtro de fecha */}
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.filtersComponent}>
            <div className={styles.filtersWrapper}>
                {config.map((filter) => (
                    <div key={filter.key} className={styles.filterItem}>
                        <button className={styles.filterButton} onClick={() => toggleModal(filter.key)}>
                            {filter.label}
                        </button>

                        {openModalKey === filter.key && (
                            <div className={styles.filterModal}>
                                <div className={styles.label}>Filtrar por {filter.label}</div>
                                {renderInput(filter)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
