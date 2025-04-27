
import { useState } from 'react';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';
import { FilterItemConfig } from './FilterBar';

interface FilterInputRendererProps<T extends string = string> {
    filter: FilterItemConfig;
    filters: Record<T, string | number | undefined>;
    updateFilter: (key: T, value: string | number) => void;
    updateFilters: (updates: Partial<Record<T, string | number>>) => void;
    toggleModal: (key: string) => void
}


export const FilterBarInputs = <T extends string = string>({
    filter,
    filters,
    updateFilter,
    updateFilters,
    toggleModal
}: FilterInputRendererProps<T>): JSX.Element | null => {

    const value = filters[filter.key as T];
    const [inputValue, setInputValue] = useState('');
    const [hasTyped, setHasTyped] = useState(false); // <- Bandera del buscador ( input )


    switch (filter.type) {
        case 'select':
            return (
                <select
                    className={styles.filterButton}
                    value={value ?? ''}
                    onChange={(e) => {
                        updateFilter(filter.key as T, e.target.value);
                        toggleModal(filter.key);
                    }}
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
                <>
                    <input
                        type={filter.inputType || 'text'}
                        className={styles.filterButton}
                        value={hasTyped ? inputValue : value ?? ''}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setHasTyped(true);
                        }}
                    />

                    <button
                        className={`button-small blue ${styles.inputButton}`}
                        onClick={() => {
                            updateFilter(filter.key as T, inputValue)
                            toggleModal(filter.key)
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
                        value={inputValue ? inputValue : value ?? ''}
                        onChange={(e) => updateFilter(filter.key as T, e.target.value)}
                    />
                </>
            );
        case 'radio':
            return (
                <div className={styles.radioGroup}>
                    {filter.options?.map((option) => (
                        <label key={option.value} className={styles.option}>
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
        case 'date-range':
            return (
                <div className={styles.dateRangeWrapper}>
                    {filter.children?.map((childFilter) => (
                        <div key={childFilter.key} className={styles.dateRangeItem}>
                            <FilterBarInputs
                                filter={childFilter}
                                filters={filters}
                                updateFilter={updateFilter}
                                updateFilters={updateFilters}
                                toggleModal={toggleModal}
                            />
                        </div>
                    ))}
                </div>
            );

        default:
            return null;
    }
};