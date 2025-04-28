import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

export const getUserManagementColumns = (isReadOnly, handleEdit) => {
  const baseColumns = [
    { key: "firstName", label: "First Name", sx: { pl: 4 } },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email ID" },
    { key: "role", label: "Roles" },
    {
      key: "lastLoggedIn",
      label: "Last Login",
      render: (row) => row.lastLoggedIn || "Not logged in Yet",
    },
  ];

  if (!isReadOnly) {
    baseColumns.push({
      key: "actions",
      label: "Actions",
      render: (row) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEdit(row.id)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    });
  }

  return baseColumns;
};
