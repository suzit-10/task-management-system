import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  options?: Option[];
  value?: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
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

  const toggleOption = (optionValue: string | number) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const getLabel = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) {
      const opt = options.find((o) => o.value === value[0]);
      return opt ? opt.label : placeholder;
    }
    return `${value.length} selected`;
  };

  return (
    <div ref={dropdownRef} className="relative w-[200px]">
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
          className={`whitespace-nowrap overflow-hidden text-ellipsis ${value.length > 0 ? "text-gray-900" : "text-gray-400"}`}
        >
          {getLabel()}
        </span>

        <div className="flex items-center gap-1">
          {value.length > 0 && !disabled && (
            <span
              className="material-icons text-sm text-gray-400 hover:text-red-500 transition-colors p-1"
              onClick={(e) => {
                e.stopPropagation();
                onChange([]);
              }}
              title="Clear all"
            >
              close
            </span>
          )}
          {isOpen ? (
            <span className="material-icons text-gray-500">expand_less</span>
          ) : (
            <span className="material-icons text-gray-500">expand_more</span>
          )}
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2.5 text-gray-500 text-sm">No options</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`
                  w-full px-4 py-2.5 text-left flex items-center justify-between
                  transition-colors duration-150 text-sm
                  ${
                    value.includes(option.value)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="truncate">{option.label}</span>
                {value.includes(option.value) && (
                  <span className="material-icons text-base ml-2">done</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
