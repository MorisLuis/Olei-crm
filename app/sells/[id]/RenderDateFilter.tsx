import InputRangeDate from '@/components/Inputs/inputRangeDate'
import React, { useState } from 'react'
import styles from '../../../styles/Components/InputRangeDate.module.scss';
import InputDatePicker from '@/components/Inputs/inputDate';
import { FilterObject } from '@/hooks/Filters/useFilters';
import { transformDate } from '@/utils/transformDate';

interface RenderDateFilterInterface {
    onSelectFilter: ({ filterObject, filterType }: { filterObject?: FilterObject, filterType: string }) => void;
    onDeleteFilter: (filterValue: string | number) => void;
    filtersActive: FilterObject[]
}

export default function RenderDateFilter({
    onSelectFilter,
    onDeleteFilter,
    filtersActive
}: RenderDateFilterInterface) {


    // States to store the labels of the start and end date filters.
    // Used just to delete this filters if we selected exactly date.
    const [endDate, setEndDate] = useState<string>(''); // Selected end date
    const [startDate, setStartDate] = useState<string>(''); // Selected start date

    const handelSelectExactlyDate = (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const filterSelected = { 
            filter: 'Date', 
            value: valueDate, 
            label: `Exact Date: ${valueDate}` 
        };

        // Remove any active range filters (start and end dates)
        onDeleteFilter(endDate);
        onDeleteFilter(startDate);

        // Notify the selection of the new exact date filter
        onSelectFilter({ filterObject: filterSelected, filterType: 'Date' });
    };

    const handelSelectStartDate = (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const labelDate = `Start Date: ${valueDate}`;
        const filterSelected = { 
            filter: 'DateStart', 
            value: valueDate, 
            label: labelDate 
        };

        // Update the state with the start date label
        setStartDate(labelDate);

        // Notify the selection of the start date filter
        onSelectFilter({ filterObject: filterSelected, filterType: 'DateStart' });
    };

    const handelSelectEndDate = (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const labelDate = `End Date: ${valueDate}`;
        const filterSelected = { 
            filter: 'DateEnd', 
            value: valueDate, 
            label: labelDate 
        };

        // Update the state with the end date label
        setEndDate(labelDate);

        // Notify the selection of the end date filter
        onSelectFilter({ filterObject: filterSelected, filterType: 'DateEnd' });
    };

    return (
        <div className={styles.InputRangeDate}>
            <div className={styles.exactly}>
                <p>Filtra por fecha exacta</p>
                <InputDatePicker
                    onChange={(value) => handelSelectExactlyDate(value ?? new Date())}
                    label='Fecha exacta'
                    value={filtersActive?.find((item) => item.filter === 'Date')?.value as string}
                />
            </div>
            <div className={styles.range}>
                <p>Filtra por rango de fecha</p>
                <InputRangeDate
                    labels={{ label1: "Mayor que", label2: "Menor que" }}
                    values={{ value1: filtersActive?.find((item) => item.filter === 'DateStart')?.value as string, value2: filtersActive?.find((item) => item.filter === 'DateEnd')?.value as string }}
                    onChanges={{
                        onChange1: (value) => handelSelectStartDate(value ?? new Date()),
                        onChange2: (value) => handelSelectEndDate(value ?? new Date())
                    }}
                />
            </div>
        </div>
    )
}
