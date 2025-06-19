import { FilterItemConfig } from "./FilterBar";

interface FilterBarValuesInterface<T extends string = string> {
    config: FilterItemConfig;
    filters: Record<T, string | number | undefined>;
}

export interface FilterResponse {
    keyValue: string | number | null,
    value: string | null,
    active: boolean
}

export const filterBarValues = <T extends string>({
    config,
    filters
}: FilterBarValuesInterface): FilterResponse => {
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

    if (config.type === 'date-range') {
        const dateStart = filters['DateStart' as T];
        const dateEnd = filters['DateEnd' as T];
        const dateExactly = filters['DateExactly' as T];

        if (dateExactly) {
            value = `${dateExactly}`;
        } else if (dateStart && dateEnd) {
            value = `${dateStart} - ${dateEnd}`;
        } else if (dateStart) {
            value = `${dateStart}`;
        } else if (dateEnd) {
            value = `${dateEnd}`;
        }

        const someHasValue = [dateStart, dateEnd, dateExactly].some(
            val => typeof val === 'string' && val.trim() !== ''
        );

        if (someHasValue) {
            active = true;
        }
    }


    if (config.type === 'input') {
        value = `${filters[key]}`;
        keyValue = key

        if (value) {
            active = true;
        }
    }


    return {
        value: value ?? null,
        active,
        keyValue
    }
}