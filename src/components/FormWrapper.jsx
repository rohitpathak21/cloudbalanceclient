import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

const FormWrapper = ({
  formFields,
  buttonText,
  onSubmit,
  validateField,
  disabled,
  loadingText,
  extraContent,
  onFieldChange,
}) => {
  const [formData, setFormData] = useState(
    Object.fromEntries(formFields.map((field) => [field.name, ""]))
  );
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (formData.role) {
      onFieldChange("role", formData.role);
    }
  }, [formData.role, onFieldChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    const newTouched = {};

    formFields.forEach(({ name }) => {
      const error = validateField(name, formData[name]);
      if (error) newErrors[name] = error;
      newTouched[name] = true;
    });

    return { newErrors, newTouched };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newErrors, newTouched } = validateAllFields();
    setErrors(newErrors);
    setTouched(newTouched);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6" autoComplete="off">
      {formFields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[field.name]}
          touched={touched[field.name]}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          options={field.options}
          showToggle={field.type === "password"}
        />
      ))}

      {extraContent && <div>{extraContent}</div>}

      <Button type="submit" className="w-full mt-6 text-lg font-semibold" disabled={disabled} loadingText={loadingText}>
        {buttonText}
      </Button>
    </form>
  );
};

export default FormWrapper;
