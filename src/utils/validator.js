// src/utils/validator.js

export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  if (email !== email.toLowerCase()) return "Email must be in lowercase.";
  if (email.length <= 5) return "Email must be more than 5 characters.";
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(email)) return "Email format is invalid.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must contain a digit.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain a special character.";
  return null;
};

export const validateName = (name, field) => {
  if (!name) return `${field} is required.`;
  if (name.length < 2) return `${field} must be at least 2 characters.`;
  if (name.length > 20) return `${field} must be at most 20 characters.`;
  if (!/^[A-Za-z]+$/.test(name)) return `${field} must contain only letters.`;
  return null;
};

export const validateRole = (role) => {
  const allowedRoles = ["CUSTOMER", "READONLY", "ADMIN"];
  if (!role) return "Role is required.";
  if (!allowedRoles.includes(role)) return "Invalid role selected.";
  return null;
};



