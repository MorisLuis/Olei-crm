"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale"; // Importa el idioma deseado

const InputDatePicker = () => {
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

    return (
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="input"
                placeholderText="Selecciona una fecha"
                locale={es} 
                popperPlacement="bottom-start"
                dayClassName={getDayClassName}
            />
    );
};

export default InputDatePicker;
