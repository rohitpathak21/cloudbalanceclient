import React, { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";

const Modal = ({
  title,
  onClose,
  formFields,
  onSubmit,
  validateField,
  onFieldChange,
  extraContent,
}) => {
  const modalRef = useRef();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const initialValues = {};
    const initialTouched = {};
    formFields.forEach((field) => {
      initialValues[field.name] = field.defaultValue || "";
      initialTouched[field.name] = false;
    });
    setFormValues(initialValues);
    setTouched(initialTouched);
  }, [formFields]);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (validateField) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    onFieldChange?.(name, value);
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validateField) {
      const error = validateField(name, formValues[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const newTouched = {};
    let hasError = false;

    formFields.forEach(({ name }) => {
      const value = formValues[name];
      const error = validateField?.(name, value);
      newTouched[name] = true;

      if (error) {
        newErrors[name] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    if (!hasError) {
      onSubmit(formValues);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-[50vw] max-h-[90vh] overflow-y-auto px-6 py-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={
              formFields.length > 1
                ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                : "space-y-4"
            }
          >
            {formFields.map((field) => (
              <div key={field.name} className="px-4 sm:px-6">
                <Input
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formValues[field.name] ?? ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  error={errors[field.name]}
                  touched={touched[field.name]}
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                  options={field.options}
                  showToggle={field.type === "password"}
                  className="px-2 py-1"
                />
              </div>
            ))}
          </div>

          {extraContent && (
            <div className="mt-2 flex justify-end items-center w-[60%]">
              <div>{extraContent}</div>
            </div>
          )}

          <div className="flex justify-end bottom-10 right-10 relative">
            <Button
              type="submit"
              className="mt-6 bg-blue-600 hover:bg-blue-700 block px-6 py-3 text-lg"
            >
              Create User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
