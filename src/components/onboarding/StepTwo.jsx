import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { onboardingPoliciesConfig } from "../utils/OnboardingConfig";
import Step from "../components/onboarding/Step";
import { useNavigate } from "react-router-dom";

const StepTwo = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/onboarding/step3");
  };

  const handleBack = () => {
    navigate("/onboarding/step1");
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create an IAM Role - Step 2
      </Typography>

      <Paper elevation={3} sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 4 }}>
        {onboardingPoliciesConfig.map((step) => (
          <Box key={step.stepNumber} mb={4}>
            <Step {...step} />
          </Box>
        ))}
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next - Cost and Usage Report</Button>
      </Box>
    </Box>
  );
};

export default StepTwo;
