import React from "react";

const Button = ({
  type,
  onClick,
  className = "",
  children,
  disabled,
  loadingText = "Submitting...",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        mt-4 py-2 px-4 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
        text-white rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
        ${className}
      `}
    >
      {disabled ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
