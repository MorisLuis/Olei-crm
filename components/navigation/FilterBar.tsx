'use client';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';

export interface FilterItemConfig {
    key: string;
    label: string;
    type: 'select' | 'input' | 'date' | 'radio' | 'date-range';
    inputType?: string;
    options?: { label: string; value: string | number, activeValue?: string }[];
    children?: FilterItemConfig[];  // Añadir children aquí para filtros tipo 'date-range'
}

interface FilterBarProps<T extends string = string> {
    filters: Record<T, string | number | undefined>;
    config: FilterItemConfig[];
    updateFilter: (key: T, value: string | number) => void;
    updateFilters: (updates: Partial<Record<T, string | number>>) => void;
    removeFilter: (key: T) => void;
}

const FilterBar = <T extends string = string>({
    filters,
    config,
    updateFilter,
    updateFilters,
    removeFilter
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

    const getValues = (config: FilterItemConfig): { keyValue: string | number | null, value: string | null, active: boolean } => {
        const key = config.key as keyof typeof filters;

        let value;
        let active = false;
        let keyValue = null;

        if (config.type === 'select') {
            const currentValue = filters[key];
            const option = config.options?.find(opt => opt.value === currentValue);

            if (option?.value) {
                value = `${option.label}`;
                active = true;
                keyValue = config.key
            }
        }

        if (config.type === 'radio') {
            const selected = config.options?.find((opt) => {
                const radioKey = opt.value as keyof typeof filters;
                return filters[radioKey] === 1;
            });

            if (selected) {
                value = `${selected.activeValue}`;
                active = true;
                keyValue = selected.value
            }
        }

        return {
            value: value ?? null,
            active,
            keyValue
        }
    };

    return (
        <div className={styles.filtersComponent}>
            <div className={styles.filtersWrapper}>
                {config.map((filter) => {
                    const values = getValues(filter);
                    const isActive = values.active;

                    return (
                        <div key={filter.key} className={styles.filterItem}>
                            <div style={{ display: 'flex' }}>
                                {isActive && (
                                    <button
                                        className={`${styles.filterButton} ${styles.icon}`}
                                        onClick={() => removeFilter(values.keyValue as T)}
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

                            {openModalKey === filter.key && (
                                <div className={styles.filterModal}>
                                    <div className={styles.label}>Filtrar por {filter.label}</div>
                                    {renderInput(filter)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default FilterBar;
