"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale"; // Importa el idioma deseado

interface InputDatePicker {
    onChange: (date: Date | null) => void;
    label?: string;
    value?: Date | string; // Esta prop se espera como una fecha en string
}

const InputDatePicker = ({
    onChange,
    label,
    value
}: InputDatePicker) => {

    // Estado local para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        if (value) {
            const parsedDate = new Date(value);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return null;
    });
    

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

    const handleOnChange = (date: Date | null) => {
        setSelectedDate(date); // Actualiza el estado local
        onChange(date); // Notifica al componente padre
    };

    return (
        <div>
            {label && <label htmlFor={label} className="label">{label}</label>}

            <DatePicker
                selected={selectedDate} // Usa el estado sincronizado
                onChange={(date) => handleOnChange(date)}
                dateFormat="dd/MM/yyyy"
                className="input"
                placeholderText="Selecciona una fecha"
                locale={es}
                popperPlacement="bottom-start"
                dayClassName={getDayClassName}
            />
        </div>
    );
};

export default InputDatePicker;
