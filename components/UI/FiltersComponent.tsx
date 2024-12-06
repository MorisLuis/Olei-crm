import React, { useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonSmall from '../Buttons/ButtonSmall';
import { FilterData, FilterObject } from '@/hooks/Filters/useFilters';
import { FilterSectionType } from '@/seed/Filters/FiltersSells';
import styles from '../../styles/Filters.module.scss';


interface FiltersComponentInterface {
    open: boolean;
    filterSections: FilterSectionType[];
    filtersOfSection: FilterData[];
    onOpenFilters: () => void;
    onSelectFilter: ({ filterObject, filterType }: { filterObject?: FilterObject, filterType: string }) => void;
    filtersActive: FilterObject[];
    // Optional properties
    customFilters?: readonly string[];
    customRenders?: Array<{ [key: string]: React.ReactNode }>;
}


export default function FiltersComponent({
    open,
    onOpenFilters,
    filterSections,
    filtersOfSection,
    filtersActive,
    customFilters,
    customRenders,
    onSelectFilter
}: FiltersComponentInterface) {

    const [selectedFilterCategory, setSelectedFilterCategory] = useState<FilterSectionType | null>(); // First menu
    const filterOptionSelected = filtersOfSection.find(filterOption => filterOption.type === selectedFilterCategory?.value);

    const handleSelectFilterCategory = (filter: FilterSectionType) => {
        setSelectedFilterCategory(filter);
    };

    const handleBackToFiltersCategories = () => {
        setSelectedFilterCategory(null);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newValue = checked ? value : undefined;
        const filterSelected = filterOptionSelected?.data.find((item) => item.value == newValue);
        const filterType = filterOptionSelected?.type
        if (!filterType) return;
        onSelectFilter({ filterObject: filterSelected, filterType });
    };

    // Optional functions.
    const renderCustomFilters = (filter: FilterSectionType) => {
        if (!customRenders) return null;

        const customRender = customRenders.find((render) => render[filter.value]);
        return customRender ? customRender[filter.value] : null;
    };


    // First menu
    const renderMenuFilters = () => {
        return (
            <div className={styles.filterList}>
                {filterSections.map((option, index) => (
                    <div
                        key={index}
                        className={styles.filterItem}
                        onClick={() => handleSelectFilterCategory(option)}
                    >
                        {option.icon && <FontAwesomeIcon icon={option.icon} className={styles.filterItem__icon} />}
                        <p>{option.label}</p>
                    </div>
                ))}
            </div>
        )
    };

    // Second menu
    const renderFilterSelectedOptions = () => {
        if (!selectedFilterCategory) return;
        return (
            <div className={styles.filterOptions}>

                <div className={styles.filterOptions__Header} onClick={handleBackToFiltersCategories}>
                    <button className={styles.backButton}>
                        <FontAwesomeIcon icon={faArrowLeft} className={`icon display-flex align`} />
                    </button>
                    <p>{selectedFilterCategory.label}</p>
                </div>


                {/*  FILTERS OF SECTION */}
                {
                    customFilters?.includes(selectedFilterCategory.value) ? (
                        renderCustomFilters(selectedFilterCategory)
                    ) : (
                        filterOptionSelected?.data.map((item, index) => (
                            <div key={index} className={styles.inputCheck}>
                                <label>
                                    <input
                                        type="checkbox"
                                        id={filterOptionSelected.type}
                                        value={item.value}
                                        checked={filtersActive.find((item) => item.filter === selectedFilterCategory.value)?.value == item.value}
                                        className={styles.filterItemDetail}
                                        onChange={handleCheckboxChange}
                                    />
                                    <p>{item.label}</p>
                                </label>
                            </div>
                        ))
                    )}
            </div>
        )
    }

    return (
        <div className={styles.filters}>

            <ButtonSmall
                text='Filtros'
                onClick={onOpenFilters}
                icon={faSliders}
                color='white'
                extraStyles={{ zIndex: open ? 9999 : 9 }}
            />

            {open && (
                <div className={styles.modalFilter}>
                    {
                        !selectedFilterCategory ? (
                            renderMenuFilters()
                        ) : (
                            renderFilterSelectedOptions()
                        )}
                </div>
            )}
        </div>
    );
}