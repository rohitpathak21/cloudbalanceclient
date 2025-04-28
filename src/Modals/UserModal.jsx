import React, { useState, useEffect } from "react";
import GenericModal from "../Modals/GenericModal";
import { createUserFormConfig } from "../utils/Config";
import { validateEmail, validatePassword, validateName, validateRole } from "../utils/validator";
import { toast } from "react-toastify";
import AccountAssignment from "../components/AccountAssignment";
import useApi from "../hooks/useApi";
import FormWrapper from "../components/FormWrapper"; // import the FormWrapper

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
        const userData = await request({ method: "GET", url: `/api/users/${id}` });

        const initial = {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          password: "", 
          role: userData.role || "",
        };

        setFormValues(initial);
        setSelectedRole(userData.role || "");

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

  const handleSubmit = async (formData) => {
    const newErrors = {};
    const newTouched = {};
    let hasError = false;

    createUserFormConfig.forEach((field) => {
      const value = formData[field.name];
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
        ? { ...formData, accountIds: assignedAccounts }
        : formData;

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

  const extraContent = selectedRole === "CUSTOMER" && (
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
  );

  return (
    <GenericModal
      isOpen={true}
      onClose={onClose}
      title={isEditMode ? "Edit User" : "Create New User"}
      body={
        <FormWrapper
          formFields={createUserFormConfig}
          formValues= {formValues}
          buttonText={isEditMode ? "Update User" : "Create User"}
          onSubmit={handleSubmit}
          validateField={validateFields}
          disabled={false}
          loadingText={loadingAccounts ? "Saving..." : ""}
          extraContent={extraContent}
          onFieldChange={handleChange}
        />
      }
      sx={{ width: "600px" }}
    />
  );
};

export default UserModal;
