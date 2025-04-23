
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Input = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  options = [],
  showToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showToggle ? (showPassword ? "text" : "password") : type;
  const showSuccess = touched && !error && value;
  const showError = touched && error;

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative">
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full p-4 pr-10 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              showError
                ? "border-red-500"
                : showSuccess
                ? "border-green-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              id={name}
              name={name}
              type={inputType}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
              className={`w-full p-4 pr-12 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                showError
                  ? "border-red-500"
                  : showSuccess
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />

            {isPassword && showToggle && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </>
        )}

        {showError && (
          <FaExclamationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-lg pointer-events-none" />
        )}
        {showSuccess && !showError && (
          <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-lg pointer-events-none" />
        )}
      </div>

      {showError && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
