import React, { useState, useEffect } from "react";
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
import useApi from "../hooks/useApi"; // Import the useApi hook
import GenericTable from "../components/GenericTable";

const AWSservices = () => {
  const [selectedTab, setSelectedTab] = useState("EC2");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState([]);  // To store the accounts
  const [filters, setFilters] = useState({ id: "", name: "", region: "", status: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);  // To store the fetched data
  const { request } = useApi();  // Initialize the API hook

  // Function to fetch the accounts from the API
  const fetchAccounts = async () => {
    try {
      const response = await request({
        method: "GET",
        url: "/api/accounts/all",
      });
      setAccounts(response);  // Update the accounts state with the fetched data
      if (response.length > 0) {
        setSelectedAccount(response[0].accountId);  // Set the default account
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // Function to fetch data based on tab and account
  const fetchData = async () => {
    try {
      let url = "";
      if (selectedTab === "EC2") {
        url = `/aws/ec2?accountId=${selectedAccount}`;
      } else if (selectedTab === "RDS") {
        url = `/aws/rds?accountId=${selectedAccount}`;
      } else if (selectedTab === "ASG") {
        url = `/aws/asg?accountId=${selectedAccount}`;
      }

      const response = await request({
        method: "GET",
        url: url,
      });

      // Set the response data into state
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();  // Fetch accounts when the component mounts
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      fetchData(); // Fetch data when selected tab or account changes
    }
  }, [selectedTab, selectedAccount]);

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

  // Filter data based on the filters state
  const filteredData = data.filter((row) => {
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
              <MenuItem key={idx} value={acc.accountId}>
                {acc.name}
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
