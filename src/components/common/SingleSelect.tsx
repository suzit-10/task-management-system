import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SingleSelectProps {
  options?: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Single Select Dropdown
export const SingleSelect: React.FC<SingleSelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 text-left border rounded-lg
          flex items-center justify-between
          transition-all duration-200
          ${className || "bg-white"}
          ${
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200"
              : "hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
          }
        `}
      >
        <span
          className={`whitespace-nowrap ${selectedOption ? "text-gray-900" : "text-gray-400"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {isOpen ? (
          <span className="material-icons">expand_less</span>
        ) : (
          <span className="material-icons">expand_more</span>
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2.5 text-left flex items-center justify-between
                transition-colors duration-150
                ${
                  value === option.value
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <span className="material-icons">done</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
