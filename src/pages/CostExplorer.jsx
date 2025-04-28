import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import CostExplorerTabs from "../components/costExplorer/CustomTabs"
import CustomDateRangePicker from "../components/costExplorer/CustomDateRangePicker";
import FilterSidebar from "../components/costExplorer/FilterSidebar";

const CostExplorer = () => {
  const [selectedDates, setSelectedDates] = useState({ startDate: null, endDate: null });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleTabSelect = (tab) => {
    console.log("Selected tab:", tab);
  };

  const handleDateChange = (dates) => {
    console.log("Selected Dates:", dates);
    setSelectedDates(dates);
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        paddingY: 2,
        paddingX: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ paddingY: "16px", paddingX: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Cost Explorer
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ marginTop: 1 }}>
          How to be always aware of Cost changes and history
        </Typography>
      </Box>

      {/* Content */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          padding: 3,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Row: Tabs + Date Picker + Filter Icon */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <CostExplorerTabs onTabSelect={handleTabSelect} />
          <Box sx={{ marginLeft: 2 }}>
            <CustomDateRangePicker onDateChange={handleDateChange} />
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <FilterSidebar isOpen={isFilterOpen} toggleSidebar={toggleFilterSidebar} />
          </Box>
        </Box>

        {/* Other content below */}
        <Box>
          {/* Future Cost Explorer Content */}
        </Box>
      </Paper>
    </Box>
  );
};

export default CostExplorer;
