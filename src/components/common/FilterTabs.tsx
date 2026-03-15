type Option = {
  label: string;
  value: string;
};

function FilterTabs({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <div className="inline-flex my-4 p-1 rounded-lg bg-gray-100 gap-1 flex-nowrap border border-gray-300">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`
            px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap
            transition-all duration-200 ease-out
            ${
              opt.value === value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }
          `}
          onClick={() => onChange(opt.value)}
          aria-pressed={opt.value === value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;