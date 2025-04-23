import React, { useState, useEffect } from "react";
import Modal from "../Modals/Modal";
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

const CreateUserModal = ({ onClose, id = null }) => {
  const isEditMode = Boolean(id);

  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [searchUnassigned, setSearchUnassigned] = useState("");
  const [searchAssigned, setSearchAssigned] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [initialValues, setInitialValues] = useState(
    isEditMode
      ? null
      : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        }
  );

  const { request } = useApi();

  // Fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true);
        const data = await request({ method: "GET", url: "/api/accounts/all" });
        setAccounts(data);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
        toast.error("Failed to load accounts");
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch user details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const data = await request({
            method: "GET",
            url: `/api/users/${id}`,
          });

          setInitialValues({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            password: "", // usually not pre-filled
            role: data.role || "",
          });

          setSelectedRole(data.role || "");

          if (data.role === "CUSTOMER" && data.accounts) {
            const ids = data.accounts.map((a) => a._id || a.id);
            setAssignedAccounts(ids);
          }
        } catch (err) {
          console.error("Failed to fetch user", err);
          toast.error("Failed to load user details");
        }
      };

      fetchUser();
    }
  }, [id]);

  // ✅ Prevent modal from rendering until edit data is loaded
  if (isEditMode && !initialValues) {
    return null; // or <p>Loading...</p> if you want
  }

  const handleToggleAccount = (accountId) => {
    setAssignedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSubmit = async (formData) => {
    const finalData =
      selectedRole === "CUSTOMER"
        ? { ...formData, accountIds: assignedAccounts }
        : formData;

    try {
      if (isEditMode) {
        await request({
          method: "PUT",
          url: `/users/${id}`,
          data: finalData,
        });
        toast.success("User updated successfully");
      } else {
        await request({
          method: "POST",
          url: "/users",
          data: finalData,
        });
        toast.success("User created successfully");
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to submit user");
    }
  };

  const validateFields = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value);
      case "password":
        return !isEditMode ? validatePassword(value) : null;
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

  const handleFieldChange = (name, value) => {
    if (name === "role") setSelectedRole(value);
  };

  const extraContent =
    selectedRole === "CUSTOMER" ? (
      loadingAccounts ? (
        <p className="text-center text-gray-500">Loading accounts...</p>
      ) : (
        <AccountAssignment
          dummyAccounts={accounts}
          assignedAccounts={assignedAccounts}
          searchUnassigned={searchUnassigned}
          setSearchUnassigned={setSearchUnassigned}
          searchAssigned={searchAssigned}
          setSearchAssigned={setSearchAssigned}
          handleToggleAccount={handleToggleAccount}
        />
      )
    ) : null;

  const formConfig = createUserFormConfig.map((field) => {
    if (isEditMode && field.name === "password") {
      return { ...field, required: false };
    }
    return field;
  });

  return (
    <Modal
      title={isEditMode ? "Edit User" : "Create New User"}
      onClose={onClose}
      formFields={formConfig}
      onSubmit={handleSubmit}
      validateField={validateFields}
      onFieldChange={handleFieldChange}
      extraContent={extraContent}
      initialValues={initialValues}
      submitButtonLabel={isEditMode ? "Update User" : "Create User"}
    />
  );
};

export default CreateUserModal;
