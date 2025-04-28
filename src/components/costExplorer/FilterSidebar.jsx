import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Divider
} from "@mui/material";
import { FilterList, ExpandMore } from "@mui/icons-material";

const dummyFilters = [
  {
    label: "Service",
    options: ["EC2", "S3", "RDS", "Lambda"]
  },
  {
    label: "Instance Type",
    options: ["t2.micro", "m5.large", "c5.xlarge"]
  },
  {
    label: "Region",
    options: ["us-east-1", "us-west-2", "ap-south-1"]
  }
];

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleDrawer = (state) => () => {
    setOpen(state);
    if (!state) {
      setExpanded(null);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleCheckboxChange = (category, option) => (event) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [option]: event.target.checked
      }
    }));
  };

  const handleApply = (category) => {
    console.log("Applied filters for", category, selectedOptions[category]);
    setExpanded(null);
  };

  const handleCloseAccordion = () => {
    setExpanded(null);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} sx={{ ml: 2 }}>
        <FilterList />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 340, padding: 2 }
        }}
      >
        <Typography variant="h6" mb={2}>
          Filters
        </Typography>

        {dummyFilters.map((filter, idx) => (
          <Accordion
            key={filter.label}
            expanded={expanded === idx}
            onChange={handleAccordionChange(idx)}
            disableGutters
            elevation={0}
            sx={{
              border: "1px solid #ddd",
              mb: 1,
              borderRadius: 2,
              "&:before": { display: "none" }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold">{filter.label}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {filter.options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={
                        selectedOptions[filter.label]?.[option] || false
                      }
                      onChange={handleCheckboxChange(filter.label, option)}
                    />
                  }
                  label={option}
                  sx={{ width: "100%", mb: 1 }}
                />
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleCloseAccordion}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleApply(filter.label)}
                >
                  Apply
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Drawer>
    </>
  );
};

export default FilterSidebar;
