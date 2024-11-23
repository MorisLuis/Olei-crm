import React, { useRef } from "react";

interface AutoResizeTextareaProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    maxRows?: number;
}

const InputTextBox: React.FC<AutoResizeTextareaProps> = ({
    value,
    placeholder,
    onChange,
    maxRows,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
        }
        onChange(e.target.value);
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            placeholder={placeholder}
            onChange={handleInput}
            className="input textbox"
            style={{
                overflow: "hidden",
                resize: "none",
                maxHeight: maxRows ? `${maxRows * 1.5}em` : undefined,
            }}
        />
    );
};

export default InputTextBox;
