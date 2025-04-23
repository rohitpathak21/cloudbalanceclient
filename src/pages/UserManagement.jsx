import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "../Modals/UserModal";
import useApi from "../hooks/useApi";
import GenericTable from "../components/GenericTable";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { request } = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await request({
          method: "GET",
          url: "/api/users/all",
        });
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
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

  const handleCreate = () => {
    setSelectedUserId(null);
    setOpenModal(true);
  };

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        User Management
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "12px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
            onClick={handleCreate}
          >
            Add New User
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <GenericTable
            columns={columns}
            data={users}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            renderActions={(row) => (
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleEdit(row.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          />
        )}
      </Paper>

      {openModal && (
        <UserModal onClose={handleCloseModal} id={selectedUserId} />
      )}
    </Box>
  );
};

export default UserManagement;
