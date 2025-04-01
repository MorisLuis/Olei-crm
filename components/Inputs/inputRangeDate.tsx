import React from 'react';
import InputDatePicker from './inputDate';

interface InputRangeDateInterface {
  labels: { label1: string; label2: string };
  values: { value1: string | undefined; value2: string | undefined };
  onChanges: {
    onChange1: (date: Date | null) => void;
    onChange2: (date: Date | null) => void;
  };
}

export default function InputRangeDate({ labels, values, onChanges }: InputRangeDateInterface)  : JSX.Element {
  return (
    <div className="inputRangeDate">
      <InputDatePicker
        onChange={onChanges.onChange1}
        label={labels.label1}
        value={new Date(values.value1 as string)}
      />
      <InputDatePicker
        onChange={onChanges.onChange2}
        label={labels.label2}
        value={new Date(values.value2 as string)}
      />
    </div>
  );
}
