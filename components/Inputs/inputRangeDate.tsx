import React from 'react';
import InputDatePicker from './inputDate';

interface InputRangeDateInterface {
    labels: { label1: string, label2: string },
    values: { value1: string, value2: string },
    onChanges: { 
        onChange1: (date: Date | null) => void
        onChange2: (date: Date | null) => void 
    }
};

export default function InputRangeDate({
    labels,
    values,
    onChanges
} : InputRangeDateInterface ) {

    return (
        <div className="inputRangeDate">
            <InputDatePicker
                onChange={onChanges.onChange1}
                label={labels.label1}
                value={values.value1}
            />
            <InputDatePicker
                onChange={onChanges.onChange2}
                label={labels.label2}
                value={values.value2}
            />
        </div>
    )
}
