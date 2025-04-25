
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import styles from './../../styles/Components/CobranzaByClientFilters.module.scss';
import { FilterItemConfig } from './FilterBar';

interface FilterInputRendererProps<T extends string = string> {
    filter: FilterItemConfig;
    filters: Record<T, string | number | undefined>;
    updateFilter: (key: T, value: string | number) => void;
    updateFilters: (updates: Partial<Record<T, string | number>>) => void;
}


export const FilterBarInputs = <T extends string = string>({
    filter,
    filters,
    updateFilter,
    updateFilters
}: FilterInputRendererProps<T>): JSX.Element | null => {

    const value = filters[filter.key as T];
    const [inputValue, setInputValue] = useState('');

    const debouncedSearchClient = useMemo(
        () =>
            debounce(async (filter, e): Promise<void> => {
                updateFilter(filter, e)
            }, 100), [updateFilter]
    );

    const onSearchItem = useCallback((filter: T, e: string): void => {
        setInputValue(e)
        debouncedSearchClient(filter, e);
    }, [debouncedSearchClient]);

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
                    value={value}
                    onChange={(e) => onSearchItem(filter.key as T, e.target.value)}
                />
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
                            />
                        </div>
                    ))}
                </div>
            );

        default:
            return null;
    }
};