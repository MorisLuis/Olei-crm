import InputRangeDate from '@/components/Inputs/inputRangeDate'
import React, { useState } from 'react'
import styles from '../../../../styles/Components/InputRangeDate.module.scss';
import InputDatePicker from '@/components/Inputs/inputDate';
import { FilterObject } from '@/hooks/Filters/useFilters';
import { transformDate } from '@/utils/transformDate';

interface DatesValuesInterface {
    exactlyDate: string | undefined,
    endDate: string | undefined,
    startDate: string | undefined
}

interface RenderDateFilterInterface {
    onSelectFilterValue: ({ filterObject, filterType }: { filterObject?: FilterObject, filterType: string }) => void;
    onDeleteFilter: (filterValue: string | number) => void;
    filtersActive: FilterObject[]
}

function RenderDateFilter({
    onSelectFilterValue,
    onDeleteFilter,
    filtersActive
}: RenderDateFilterInterface) {


    // States to store the labels of the start and end date filters.
    // Used just to delete this filters if we selected exactly date.
    const [datesFiltersActive, setDatesFiltersActive] = useState<DatesValuesInterface>({
        exactlyDate: undefined,
        endDate: undefined,
        startDate: undefined
    });

    const [datesLocalValues, setDatesLocalValues] = useState<DatesValuesInterface>({
        exactlyDate: filtersActive?.find((item) => item.filter === 'Date')?.value as string,
        endDate: filtersActive?.find((item) => item.filter === 'DateEnd')?.value as string,
        startDate: filtersActive?.find((item) => item.filter === 'DateStart')?.value as string
    })

    const handelSelectExactlyDate = (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const labelDate = `Fecha exacta: ${valueDate}`;

        const filterSelected = {
            filter: 'Date',
            value: valueDate,
            label: labelDate
        };

        // Remove any active range filters (start and end dates)
        onDeleteFilter(datesFiltersActive.endDate as string);
        onDeleteFilter(datesFiltersActive.startDate as string);
        setDatesFiltersActive((prev) => ({
            ...prev,
            exactlyDate: labelDate
        }))

        setDatesLocalValues({
            exactlyDate: valueDate,
            endDate: undefined,
            startDate: undefined
        })

        // Notify the selection of the new exact date filter
        onSelectFilterValue({ filterObject: filterSelected, filterType: 'Date' });
    };

    const handelSelectStartDate =  async (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const labelDate = `Fecha Inicio: ${valueDate}`;
        const filterSelected = {
            filter: 'DateStart',
            value: valueDate,
            label: labelDate
        };

        // Update the state with the start date label
        onDeleteFilter(datesFiltersActive.exactlyDate as string);
        setDatesFiltersActive((prev) => ({
            ...prev,
            startDate: labelDate
        }))

        setDatesLocalValues((prev) => ({
            startDate: valueDate,
            endDate: prev.endDate,
            exactlyDate: undefined
        }))

        // Notify the selection of the start date filter
        onSelectFilterValue({ filterObject: filterSelected, filterType: 'DateStart' });
    };

    const handelSelectEndDate = async (date: Date) => {

        // Convert the date to the desired format
        const valueDate = transformDate(date);
        const labelDate = `Fecha Fin: ${valueDate}`;
        const filterSelected = {
            filter: 'DateEnd',
            value: valueDate,
            label: labelDate
        };

        // Update the state with the end date label
        await onDeleteFilter(datesFiltersActive.exactlyDate as string);

        setDatesFiltersActive((prev) => ({
            ...prev,
            endDate: labelDate
        }));

        setDatesLocalValues((prev) => ({
            endDate: valueDate,
            startDate: prev.startDate,
            exactlyDate: undefined
        }));
    
        // Notify the selection of the end date filter
        onSelectFilterValue({ filterObject: filterSelected, filterType: 'DateEnd' });
    };

    return (
        <div className={styles.InputRangeDate}>
            <div className={styles.exactly}>
                <p>Filtra por fecha exacta</p>
                <InputDatePicker
                    onChange={(value) => handelSelectExactlyDate(value ?? new Date())}
                    label='Fecha exacta'
                    value={datesLocalValues.exactlyDate}
                />
            </div>
            <div className={styles.range}>
                <p>Filtra por rango de fecha</p>
                <InputRangeDate
                    labels={{ label1: "Mayor que", label2: "Menor que" }}
                    values={{ 
                        value1: datesLocalValues?.startDate, 
                        value2: datesLocalValues?.endDate
                    }}
                    onChanges={{
                        onChange1: (value) => handelSelectStartDate(value ?? new Date()),
                        onChange2: (value) => handelSelectEndDate(value ?? new Date())
                    }}
                />
            </div>
        </div>
    )
};


export const CustumRendersSellsByClient = ({
    onSelectFilterValue,
    onDeleteFilter,
    filtersActive
}: RenderDateFilterInterface) => {

    const CustumFilters = ['Date'] as const;

    type CustomRenderKey = typeof CustumFilters[number];  // 'Date'
    type CustomRenderType = {
        [key in CustomRenderKey]?: React.ReactNode;
    };

    const CustumRenders: CustomRenderType[] = [
        {
            Date: (
                <RenderDateFilter
                    onSelectFilterValue={onSelectFilterValue}
                    onDeleteFilter={onDeleteFilter}
                    filtersActive={filtersActive}
                />
            )
        },
    ];

    return {
        CustumFilters,
        CustumRenders,

    };
};
