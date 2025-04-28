import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { onboardingCURConfig } from "../utils/OnboardingConfig";
import Step from "../components/onboarding/Step";
import { useNavigate } from "react-router-dom";

const StepThree = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/usermanagement"); // Redirect to user management after finishing onboarding
  };

  const handleBack = () => {
    navigate("/onboarding/step2");
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create an IAM Role - Step 3
      </Typography>

      <Paper elevation={3} sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 4 }}>
        {onboardingCURConfig.map((step) => (
          <Box key={step.stepNumber} mb={4}>
            <Step {...step} />
          </Box>
        ))}
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleFinish}>Finish</Button>
      </Box>
    </Box>
  );
};

export default StepThree;
