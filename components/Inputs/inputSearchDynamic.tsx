import React, { useState } from 'react'
import InputSearch from './inputSearch'
import SelectBasic from './inputSelect';
import Button from '../Buttons/Button'

type InputSearchDynamicInterface<
    F extends Record<string, string | number | undefined>
> = {
    filters: F;
    updateFilter: <K extends keyof F>(key: K, value: string) => void;
    removeFilters: (keys: (keyof F)[]) => void;
    labelsMap?: Partial<Record<keyof F, string>>;
};

export default function InputSearchDynamic<
    F extends Record<string, string | number | undefined>
>({
    updateFilter,
    removeFilters,
    filters,
    labelsMap = {},
}: InputSearchDynamicInterface<F>): JSX.Element {
    const searchItems = Object.keys(filters) as (keyof typeof filters)[];

    const searchItemsObjectArray = searchItems
        .filter((item) => labelsMap[item] !== undefined)
        .map((item) => ({
            label: labelsMap[item]!,
            value: item as string | number,
        }));

    const [searchValue, setSearchValue] = useState("");
    const [searchFilterSelected, setSearchFilterSelected] = useState<
        keyof typeof filters
    >(searchItemsObjectArray[0].value as keyof typeof filters);

    const validateFilterSelected = (
        option: string | number | null
    ): keyof typeof filters => {
        if (!option) return searchItems[0];
        return option as keyof typeof filters;
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                width: "50%",
                position: "relative",
                height: "40px"
            }}
        >
            <InputSearch
                placeholder={`Buscar por ${searchItemsObjectArray.find( (item) => item.value === searchFilterSelected )?.label}`}
                onSearch={(value) => setSearchValue(value)}
                onCleanSearch={() => removeFilters(Object.keys(filters) as (keyof F)[])}
                name="searchValue"
            />
            <SelectBasic
                options={searchItemsObjectArray}
                onChange={(option) =>
                    setSearchFilterSelected(validateFilterSelected(option))
                }
                value={searchFilterSelected as string | number | null}
                name="searchBy"
                placeholder="Buscar por..."
            />

            <Button
                disabled={false}
                text="Buscar"
                onClick={() => updateFilter(searchFilterSelected, searchValue.toString())}
                extraStyles={{
                    maxWidth: "100px",
                    height: "100%"
                }}
            />
        </div>
    );
}
