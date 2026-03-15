import React from "react";

interface ButtonProps {
  variant: "filled" | "outlined" | "icon";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  disabled = false,
  loading = false,
  icon,
  children,
  onClick,
  title,
}) => {
  const baseClasses =
    "flex items-center justify-center rounded focus:outline-none transition-colors";

  let variantClasses = "";
  if (variant === "filled") {
    variantClasses = "p-2 bg-blue-500 text-white hover:bg-blue-600";
  } else if (variant === "outlined") {
    variantClasses =
      "p-2 border border-blue-500 text-blue-500 hover:bg-blue-100";
  } else if (variant === "icon") {
    variantClasses = "hover:bg-blue-100 px-0.5 border-1 border-gray-300";
  }

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      onClick={handleClick}
      disabled={disabled || loading}
      title={title}
    >
      {loading && <span className="mr-2">Loading...</span>}
      {variant === "icon" ? (
        icon
      ) : (
        <>
          {icon && (
            <span className="mr-1 flex items-center justify-center">
              {icon}
            </span>
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
