'use client';

import { useState } from 'react';
import { useEnterSubmit } from '@/hooks/dom/useEnterSubmit';
import useToast from '@/hooks/useToast';
import isValidDate from '@/utils/validators/isValidDate';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';
import { FilterItemConfig } from './FilterBar';

type FilterBarInputsProps<F extends Record<string, string | number | undefined>> = {
    filter: FilterItemConfig;
    filters: F;

    toggleModal?: (key: string) => void;
    updateFilter: <K extends keyof F>(key: K, value: F[K]) => void;
    updateFilters?: (updates: Partial<F>) => void;
};

export const FilterBarInputs = <F extends Record<string, string | number | undefined>>({
    filter,
    filters,
    updateFilter,
    updateFilters,
    toggleModal,
}: FilterBarInputsProps<F>): JSX.Element | null => {

    const value = filters[filter.key as keyof F];
    const [inputValue, setInputValue] = useState('');
    const [hasTyped, setHasTyped] = useState(false);
    const { showError } = useToast()

    const [rangeDraft, setRangeDraft] = useState<Partial<Record<keyof F, string>>>({});

    const handleKeyDown = useEnterSubmit(() => {
        updateFilter(filter.key as keyof F, inputValue as F[keyof F]);
        toggleModal?.(filter.key);
    });

    const handleDraftChange = (key: keyof F, val: string): void =>
        setRangeDraft(prev => ({ ...prev, [key]: val }));

    const handleSearchDateRange = (): void => {
        const invalidDateKey = Object.entries(rangeDraft).find(
            ([, value]) => value && !isValidDate(value)
        );

        if (invalidDateKey) {
            setRangeDraft(prev => ({ ...prev, [`${invalidDateKey[0]}`]: undefined }));
            showError(`La fecha "${invalidDateKey[1]}" no es válida. Usa formato dd/MM/yyyy.`)
            return;
        }

        updateFilters?.(rangeDraft as Partial<F>);
        toggleModal?.(filter.key);
    };


    switch (filter.type) {
        case 'select':
            return (
                <select
                    className={styles.filterButton}
                    value={value ?? ''}
                    onChange={e => {
                        updateFilter(filter.key as keyof F, e.target.value as F[keyof F]);
                        toggleModal?.(filter.key);
                    }}
                >
                    {filter.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        case 'input':
            return (
                <>
                    <input
                        type={filter.inputType || 'text'}
                        className={styles.filterButton}
                        value={hasTyped ? inputValue : (value as string | number | undefined) ?? ''}
                        onKeyDown={handleKeyDown}
                        onChange={e => {
                            setInputValue(e.target.value);
                            setHasTyped(true);
                        }}
                    />
                    <button
                        className={`button-small blue ${styles.inputButton}`}
                        onClick={() => {
                            updateFilter(filter.key as keyof F, inputValue as F[keyof F]);
                            toggleModal?.(filter.key);
                        }}
                    >
                        Buscar
                    </button>
                </>
            );
        case 'date':
            return (
                <>
                    <label className={styles.optionVertical}>{filter.label}</label>
                    <input
                        type="date"
                        className={styles.filterButton}
                        value={(value as string | undefined) ?? ''}
                        onChange={e =>
                            updateFilter(filter.key as keyof F, e.target.value as F[keyof F])
                        }
                    />
                </>
            );
        case 'radio':
            return (
                <div className={styles.radioGroup}>
                    {filter.options?.map(opt => (
                        <label key={opt.value} className={styles.option}>
                            <input
                                type="radio"
                                name={filter.key}
                                value={opt.value}
                                checked={filters[opt.value as keyof F] === 1}
                                onChange={() => {
                                    const updates: Partial<F> = {};
                                    updates[opt.value as keyof F] = 1 as unknown as F[keyof F];
                                    filter.options?.forEach(o => {
                                        if (o.value !== opt.value)
                                            (updates as Record<string, unknown>)[o.value] = 0;
                                    });
                                    updateFilters?.(updates);
                                }}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            );

        case 'date-range':
            return (
                <>
                    <div className={styles.dateRangeWrapper}>
                        {filter.children?.map((child: FilterItemConfig) => (
                            <div key={child.key} className={styles.dateRangeItem}>
                                <FilterBarInputs
                                    filter={child}
                                    filters={{ ...filters, ...rangeDraft }}
                                    updateFilter={(k, v) => handleDraftChange(k as keyof F, String(v))}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className={`button-small blue ${styles.inputButton}`}
                        onClick={handleSearchDateRange}
                    >
                        Buscar
                    </button>
                </>
            );

        default:
            return null;
    }
};
