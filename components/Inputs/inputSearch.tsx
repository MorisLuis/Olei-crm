import React from 'react'

interface inputSearchInterface {
    placeholder?: string;
    onSearch: (value: string) => void;
}

export default function InputSearch({
    placeholder = "Buscar...",
    onSearch
}: inputSearchInterface) {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onSearch === 'function') {
            onSearch(event.target.value);
        }
    };

    return (
        <div>
            <input
                className='input_search'
                placeholder={placeholder}
                onChange={(event) => handleOnChange(event)}
            />
        </div>
    )
}
