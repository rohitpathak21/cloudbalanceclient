import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDateRangePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    onDateChange?.({ startDate: newValue, endDate });
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    onDateChange?.({ startDate, endDate: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <DatePicker
          label="Start"
          value={startDate}
          onChange={handleStartDateChange}
          disableFuture
          slotProps={{
            textField: {
              size: "small",
              sx: {
                width: "150px",
                "& .MuiInputBase-root": {
                  height: 36,
                  fontSize: "12px",
                },
                "& .MuiInputBase-input": {
                  padding: "8px",
                },
              },
            },
          }}
        />
        <DatePicker
          label="End"
          value={endDate}
          onChange={handleEndDateChange}
          disableFuture
          slotProps={{
            textField: {
              size: "small",
              sx: {
                width: "150px",
                "& .MuiInputBase-root": {
                  height: 36,
                  fontSize: "12px",
                },
                "& .MuiInputBase-input": {
                  padding: "8px",
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
