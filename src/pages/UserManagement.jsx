import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import UserModal from "../Modals/UserModal";
import useApi from "../hooks/useApi";
import GenericTable from "../components/GenericTable";
import { getUserManagementColumns } from "../utils/userManagementColumns";
import Button from "../components/Button"; // your custom button

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { request } = useApi();
  
  const userRole = JSON.parse(localStorage.getItem("user"))?.role || "USER";
  const isReadOnly = userRole === "READONLY";

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
  
  const handleModalOpen = (userId = null) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  const columns = getUserManagementColumns(isReadOnly, handleModalOpen);

  const renderTableContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" py={5}>
          <CircularProgress />
        </Box>
      );
    }
    return (
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
      />
    );
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        User Management
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          {!isReadOnly && (
            <Button
              onClick={() => handleModalOpen()}
              className="font-bold py-3 px-5 rounded-md"
            >
              Add New User
            </Button>
          )}
        </Box>

        {renderTableContent()}
      </Paper>

      {openModal && (
        <UserModal onClose={handleModalClose} id={selectedUserId} />
      )}
    </Box>
  );
};

export default UserManagement;
