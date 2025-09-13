"use client";

import React from "react";

export type OptionType = {
    label: string;
    value: string | number | null;
};

interface Props {
    options: OptionType[];
    value: string | number | null;
    onChange: (value: string | number | null) => void;
    name: string;
    placeholder?: string;
    label?: string;
}

const SelectBasic = ({
    options,
    value,
    onChange,
    name,
    placeholder = "Selecciona una opción",
    label,
}: Props) : JSX.Element => {
    return (
        <div className="select">
            {label && (
                <label htmlFor={name}>
                    {label}
                </label>
            )}

            <select
                id={name}
                name={name}
                value={value ?? ""}
                onChange={(e) =>
                    onChange(e.target.value === "" ? null : e.target.value)
                }
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={String(opt.value)} value={opt.value ?? ""}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBasic;
