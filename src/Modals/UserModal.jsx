import React, { useState, useEffect } from "react";
import GenericModal from "../Modals/GenericModal";
import { createUserFormConfig } from "../utils/Config";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateRole,
} from "../utils/validator";
import { toast } from "react-toastify";
import AccountAssignment from "../components/AccountAssignment";
import useApi from "../hooks/useApi";
import Input from "../components/Input";
import Button from "../components/Button";

const UserModal = ({ onClose, id = null }) => {
  const isEditMode = Boolean(id);

  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [searchUnassigned, setSearchUnassigned] = useState("");
  const [searchAssigned, setSearchAssigned] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { request } = useApi();

  // Fetch all accounts (used in AccountAssignment)
  useEffect(() => {
    const fetchAllAccounts = async () => {
      if (selectedRole !== "CUSTOMER") return;

      try {
        setLoadingAccounts(true);
        const data = await request({ method: "GET", url: "/api/accounts/all" });
        setAccounts(data);
      } catch (err) {
        toast.error("Failed to load accounts");
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAllAccounts();
  }, [selectedRole]);

  // Fetch user + assigned accounts in edit mode
  useEffect(() => {
    const fetchUserAndAccounts = async () => {
      if (!isEditMode) {
        const initial = {};
        createUserFormConfig.forEach((field) => {
          initial[field.name] = field.defaultValue || "";
        });
        setFormValues(initial);
        setTouched({});
        return;
      }

      try {
        // 1. Fetch user details
        const userData = await request({ method: "GET", url: `/api/users/${id}` });

        const initial = {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          password: "", // always empty in edit mode
          role: userData.role || "",
        };

        setFormValues(initial);
        setSelectedRole(userData.role || "");

        // 2. Fetch assigned accounts if CUSTOMER
        if (userData.role === "CUSTOMER") {
          const assignedData = await request({
            method: "GET",
            url: `/api/accounts/${id}`,
          });

          const assignedIds = assignedData.map((a) => a._id || a.id);
          setAssignedAccounts(assignedIds);
        }
      } catch (err) {
        toast.error("Failed to load user or account details");
      }
    };

    fetchUserAndAccounts();
  }, [id]);

  const validateFields = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return !isEditMode || value ? validatePassword(value) : null;
      case "firstName":
        return validateName(value, "First name");
      case "lastName":
        return validateName(value, "Last name");
      case "role":
        return validateRole(value);
      default:
        return null;
    }
  };

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "role") {
      setSelectedRole(value);
    }

    const error = validateFields(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const newTouched = {};
    let hasError = false;

    createUserFormConfig.forEach((field) => {
      const value = formValues[field.name];
      const error = validateFields(field.name, value);
      newTouched[field.name] = true;

      if (error) {
        newErrors[field.name] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);

    if (hasError) return;

    const finalData =
      selectedRole === "CUSTOMER"
        ? { ...formValues, accountIds: assignedAccounts }
        : formValues;

    try {
      if (isEditMode) {
        await request({
          method: "PUT",
          url: `/api/users/${id}`,
          data: finalData,
        });
        toast.success("User updated successfully");
      } else {
        await request({ method: "POST", url: "/api/users", data: finalData });
        toast.success("User created successfully");
      }

      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to submit user");
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {createUserFormConfig.map((field) => {
          if (isEditMode && field.name === "password") {
            return (
              <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                value={formValues[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                error={errors[field.name]}
                touched={touched[field.name]}
                placeholder={
                  field.placeholder || `Enter ${field.label.toLowerCase()}`
                }
                options={field.options}
                showToggle={field.type === "password"}
                className="px-2 py-1"
              />
            );
          }
          return (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={formValues[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              error={errors[field.name]}
              touched={touched[field.name]}
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
              options={field.options}
              showToggle={field.type === "password"}
              className="px-2 py-1"
            />
          );
        })}
      </div>

      {selectedRole === "CUSTOMER" && (
        <div className="mt-2">
          {loadingAccounts ? (
            <p className="text-gray-500 text-center">Loading accounts...</p>
          ) : (
            <AccountAssignment
              dummyAccounts={accounts}
              assignedAccounts={assignedAccounts}
              setAssignedAccounts={setAssignedAccounts}
              searchUnassigned={searchUnassigned}
              setSearchUnassigned={setSearchUnassigned}
              searchAssigned={searchAssigned}
              setSearchAssigned={setSearchAssigned}
            />
          )}
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white"
        >
          {isEditMode ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );

  return (
    <GenericModal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit User" : "Create New User"}
      body={renderForm()}
      sx={{ width: "600px" }}
    />
  );
};

export default UserModal;
