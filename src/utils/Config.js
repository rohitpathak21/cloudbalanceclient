export const loginFormConfig = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

// src/utils/formConfig.js

export const createUserFormConfig = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    label: "Email ID",
    name: "email",
    type: "email",
    placeholder: "Enter email",
  },
  {
    label: "Role",
    name: "role",
    type: "select",
    options: ["CUSTOMER", "READONLY", "ADMIN"],
    placeholder: "Select role",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

