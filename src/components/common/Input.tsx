import React from "react";
import { cn } from "../../utils/cn"; // Utility function to combine class names

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    inputId: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    inputId,
    defaultValue,
    onChange,
    error,
    ...rest
}) => {
    const [value, setValue] = React.useState<string>(defaultValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="relative w-full mb-6">
            <input
                {...rest}
                id={inputId}
                value={value}
                onChange={handleChange}
                placeholder=" " // Prevents the browser's default placeholder from showing
                className={cn(
                    "peer w-full px-4 py-3 border border-gray-300 rounded-sm text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out",
                    error && "border-red-500",
                )}
            />
            <label
                htmlFor={inputId}
                className={cn(
                    "absolute left-4 top-3 text-gray-500 font-normal text-sm transition-all duration-200 ease-out",
                    "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600",
                    error && "text-red-500",
                )}
            >
                {!value && label}
            </label>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
