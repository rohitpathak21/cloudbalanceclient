import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import GenericTable from "../components/GenericTable";

const accounts = ["Account 1", "Account 2", "Account 3"];

const allData = {
  EC2: [
    { id: "i-123456", name: "Web Server", region: "us-east-1", status: "running" },
    { id: "i-789012", name: "DB Server", region: "us-west-1", status: "stopped" },
    { id: "i-141516", name: "Dev Machine", region: "eu-central-1", status: "terminated" },
  ],
  RDS: [
    { id: "db-001", name: "UserDB", region: "us-east-1", status: "available" },
    { id: "db-002", name: "OrdersDB", region: "us-west-2", status: "modifying" },
  ],
  ASG: [
    { id: "asg-01", name: "ASG-Frontend", region: "us-west-1", status: "Active" },
    { id: "asg-02", name: "ASG-Backend", region: "us-east-1", status: "Updating" },
  ],
};

const AWSservices = () => {
  const [selectedTab, setSelectedTab] = useState("EC2");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [filters, setFilters] = useState({ id: "", name: "", region: "", status: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    setPage(0);
    setFilters({ id: "", name: "", region: "", status: "" });
  };

  const handleAccountChange = (e) => setSelectedAccount(e.target.value);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const columns = [
    { key: "id", label: "Resource ID", render: null },
    { key: "name", label: "Resource Name", render: null },
    { key: "region", label: "Region", render: null },
    { key: "status", label: "Status", render: null },
  ];

  const filteredData = allData[selectedTab].filter((row) => {
    return Object.entries(filters).every(([key, value]) =>
      row[key].toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Tab and Account Selection */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            "& .MuiTab-root": {
              minWidth: 120,
              textTransform: "none",
              borderRight: "1px solid #ccc",
              px: 3,
              py: 1.5,
              fontWeight: 500,
            },
            "& .Mui-selected": {
              backgroundColor: "#e3f2fd",
              borderRadius: "8px 8px 0 0",
            },
          }}
        >
          <Tab value="EC2" label="EC2" />
          <Tab value="RDS" label="RDS" />
          <Tab value="ASG" label="ASG" />
        </Tabs>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Account</InputLabel>
          <Select value={selectedAccount} onChange={handleAccountChange} label="Account">
            {accounts.map((acc, idx) => (
              <MenuItem key={idx} value={acc}>
                {acc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table Title */}
      <Typography variant="h6" gutterBottom>
        {selectedTab} Resources - {selectedAccount}
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          label="Filter by ID"
          size="small"
          value={filters.id}
          onChange={(e) => handleFilterChange("id", e.target.value)}
        />
        <TextField
          label="Filter by Name"
          size="small"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <TextField
          label="Filter by Region"
          size="small"
          value={filters.region}
          onChange={(e) => handleFilterChange("region", e.target.value)}
        />
        <TextField
          label="Filter by Status"
          size="small"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        />
      </Box>

      {/* Generic Table */}
      <Paper>
        <GenericTable
          columns={columns}
          data={filteredData}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default AWSservices;
