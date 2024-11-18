import React, { useEffect, useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonSmall from '../Buttons/ButtonSmall';
import styles from '../../styles/Filters.module.scss';

export type FilterObject = { filter: string; value: string | number; label: string };

export type FilterData = {
    type: string;
    data: FilterObject[];
    value?: string | number;
};

interface FiltersComponentInterface {
    open: boolean;
    filterSections: { value: string, label: string }[];
    filtersOfSection: FilterData[];
    onOpenFilters: () => void;
    onSelectFilter: (filterObject: FilterObject,  filterType: string ) => void;

    // Optional properties
    customFilters?: readonly string[];
    customRenders?: Array<{ [key: string]: React.ReactNode }>;
}


export default function FiltersComponent({
    open,
    onOpenFilters,
    filterSections,
    filtersOfSection,
    customFilters,
    customRenders,
    onSelectFilter
}: FiltersComponentInterface) {

    const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null); // First menu
    const [filterOptionLocal, setFilterOptionLocal] = useState<string | number | undefined>()
    const filterOptionSelected = filtersOfSection.find(filterOption => filterOption.type === selectedFilterCategory);

    const handleSelectFilterCategory = (filter: string) => {
        setSelectedFilterCategory(filter);
    };

    const handleBackToFiltersCategories = () => {
        setSelectedFilterCategory(null);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newValue = checked ? value : undefined;
        const filterSelected = filterOptionSelected?.data.find((item) => item.value == value);
        const filterType = filterOptionSelected?.type
        if(!filterSelected) return;
        if(!filterType) return;
        setFilterOptionLocal(newValue);
        onSelectFilter(filterSelected, filterType);
    };

    // Optional functions.
    const renderCustomFilters = (filter: string) => {
        if (!customRenders) return null;

        const customRender = customRenders.find((render) => render[filter]);
        return customRender ? customRender[filter] : null;
    };


    // First menu
    const renderMenuFilters = () => {
        return (
            <div className={styles.filterList}>
                {filterSections.map((option, index) => (
                    <div
                        key={index}
                        className={styles.filterItem}
                        onClick={() => handleSelectFilterCategory(option.value)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )
    };


    const renderFilterSelectedOptions = () => {
        if (!selectedFilterCategory) return;
        return (
            <div className={styles.filterOptions}>

                <div className={styles.filterOptions__Header} onClick={handleBackToFiltersCategories}>
                    <button className={styles.backButton}>
                        <FontAwesomeIcon icon={faAnglesLeft} className={`icon display-flex align`} />
                    </button>
                    <p>{selectedFilterCategory}</p>
                </div>


                {/*  FILTERS OF SECTION */}
                {
                    customFilters?.includes(selectedFilterCategory) ? (
                        renderCustomFilters(selectedFilterCategory)
                    ) : (
                        filterOptionSelected?.data.map((item, index) => (
                            <div key={index} className={styles.inputCheck}>
                                <label>
                                    <input
                                        type="checkbox"
                                        id={filterOptionSelected.type}
                                        value={item.value}
                                        checked={filterOptionLocal == item.value}
                                        className={styles.filterItemDetail}
                                        onChange={handleCheckboxChange}
                                    />
                                    <p>
                                        {item.label}
                                    </p>
                                </label>
                            </div>
                        ))
                    )}
            </div>
        )
    }

    useEffect(() => {
        setFilterOptionLocal(filterOptionSelected?.value)
    }, [filterOptionSelected])


    return (
        <div className={styles.filters}>

            <ButtonSmall
                text='Filtros'
                onClick={onOpenFilters}
                icon={faSliders}
                color='white'
                extraStyles={{ zIndex: 9999 }}
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