import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Step from "../components/onboarding/Step";
import { stepsConfig } from "../utils/OnboardingConfig";

const StepOne = () => {
  const [roleArn, setRoleArn] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBlur = () => {
    setTouched(true);
    if (!roleArn.trim()) {
      setError("Role ARN is required.");
    } else {
      setError("");
    }
  };

  const handleNext = () => {
    if (roleArn.trim()) {
      navigate("/onboarding/step2");
    } else {
      setTouched(true);
      setError("Role ARN is required.");
    }
  };

  return (
    <Box sx={{ px: 5, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create an IAM Role - Step 1
      </Typography>

      <Paper elevation={3} sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 4 }}>
        {stepsConfig.slice(0, 6).map((step) => (
          <Box key={step.stepNumber} mb={4}>
            <Step {...step} />
            {step.stepNumber === 6 && (
              <Box sx={{ width: "40%", mt: 2 }}>
                <Input
                  name="roleArn"
                  label="Role ARN"
                  value={roleArn}
                  onChange={(e) => setRoleArn(e.target.value)}
                  onBlur={handleBlur}
                  touched={touched}
                  error={error}
                  placeholder="arn:aws:iam::123456789012:role/your-role-name"
                />
              </Box>
            )}
          </Box>
        ))}
      </Paper>

      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button onClick={handleNext}>Next - Add Customer Managed Policies</Button>
      </Box>
    </Box>
  );
};

export default StepOne;
