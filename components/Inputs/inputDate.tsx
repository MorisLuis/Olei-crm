"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale"; // Importa el idioma deseado

interface InputDatePicker {
    onChange: (date: Date | null) => void;
    label?: string;
    value?: string
}

const InputDatePicker = ({
    onChange,
    label,
    value
}: InputDatePicker) => {

    console.log({value})
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const getDayClassName = (date: Date) => {
        const today = new Date();
        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            return "today";
        }
        return "";
    };

    const handleOnChange = (value: Date | null) => {
        setSelectedDate(value)
        onChange(value)
    }

    return (
        <div>
            {label  && <label htmlFor={label} className="label">{label}</label>}

            <DatePicker
                selected={selectedDate}
                onChange={(date) => handleOnChange(date)}
                dateFormat="dd/MM/yyyy"
                className="input"
                placeholderText="Selecciona una fecha"
                locale={es}
                popperPlacement="bottom-start"
                dayClassName={getDayClassName}
                value={value || undefined}
            />
        </div>
    );
};

export default InputDatePicker;
