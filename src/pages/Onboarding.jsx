import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Button from "../components/Button";
import Input from "../components/Input";
import Step from "../components/onboarding/Step";
import { onboardingPoliciesConfig, stepsConfig, onboardingCURConfig } from "../utils/OnboardingConfig";
import useApi from "../hooks/useApi"; // Importing the useApi hook

const Onboarding = () => {
  const { request } = useApi(); // Initialize the hook
  const [formData, setFormData] = useState({
    roleArn: "",
    accountHolderName: "",
    accountId: "",
    region: "",
  });
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleBlur = () => {
    setTouched(true);
    if (!formData.roleArn.trim()) {
      setError("Role ARN is required.");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (
      currentPage === 1 &&
      (!formData.roleArn.trim() ||
        !formData.accountHolderName.trim() ||
        !formData.accountId.trim() ||
        !formData.region.trim())
    ) {
      setTouched(true);
      setError("All fields are required.");
      return;
    }

    if (currentPage === 1) {
      setCurrentPage(2); // Move to page 2 (policy steps)
    } else if (currentPage === 2) {
      setCurrentPage(3); // Move to page 3 (CUR steps)
    } else {
      handleFinish(); // Call handleFinish on last page
    }
  };

  const handleBack = () => {
    if (currentPage === 3) {
      setCurrentPage(2); // Move back to page 2 (policy steps)
    } else {
      setCurrentPage(1); // Move back to page 1 (initial steps)
    }
  };

  // Handle API call when finishing the onboarding process
  const handleFinish = async () => {
    // Reformat the data to match the backend's expected structure
    const payload = {
      name: formData.accountHolderName,  // Use dynamic 'name' from form data
      accountId: formData.accountId,
      arn: formData.roleArn,
      region: formData.region,  // Use dynamic 'region' from form data
    };

    try {
      const response = await request({
        method: "POST",
        url: "/api/accounts",
        data: payload, // Send the reformatted data to the API
      });
      console.log("API Response:", response);
      navigate("/usermanagement"); // Navigate after successful API call
    } catch (err) {
      console.error("Error during API call:", err);
      setError("An error occurred while creating the account. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        paddingY: 4,
        paddingX: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create an IAM Role
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Create an IAM role by following these steps
      </Typography>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 4,
        }}
      >
        {/* Page 1: Initial steps */}
        {currentPage === 1 &&
          stepsConfig.slice(0, 6).map((step) => (
            <Box key={step.stepNumber} mb={4}>
              <Step {...step} />
              {step.stepNumber === 6 && (
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Input
                      name="roleArn"
                      label="Role ARN"
                      value={formData.roleArn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      error={error}
                      placeholder="arn:aws:iam::123456789012:role/your-role-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Input
                      name="accountHolderName"
                      label="Account Holder Name"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      error={error}
                      placeholder="John Doe"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Input
                      name="accountId"
                      label="Account ID"
                      value={formData.accountId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      error={error}
                      placeholder="123456789012"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Input
                      name="region"
                      label="Region"
                      value={formData.region}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched}
                      error={error}
                      placeholder="us-west-2"
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}

        {/* Page 2: Policy steps mapped from config */}
        {currentPage === 2 &&
          onboardingPoliciesConfig.map((step) => (
            <Box key={step.stepNumber} mb={4}>
              <Step
                stepNumber={step.stepNumber}
                content={step.content}
                image={step.image}
                imageDimensions={step.imageDimensions}
                copyContent={step.copyContent}
                copyDimensions={step.copyDimensions}
                copyButtonPosition={step.copyButtonPosition}
              />
            </Box>
          ))}

        {/* Page 3: Onboarding CUR steps mapped from config */}
        {currentPage === 3 &&
          onboardingCURConfig.map((step) => (
            <Box key={step.stepNumber} mb={4}>
              <Step
                stepNumber={step.stepNumber}
                content={step.content}
                image={step.image}
                imageDimensions={step.imageDimensions}
                copyContent={step.copyContent}
                copyDimensions={step.copyDimensions}
                copyButtonPosition={step.copyButtonPosition}
              />
            </Box>
          ))}
      </Paper>

      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <button
          onClick={() => navigate("/usermanagement")}
          className="border border-blue-500 text-blue-500 bg-white px-4 py-2 rounded-md hover:bg-blue-50 transition"
        >
          Cancel
        </button>
        <Box>
          {currentPage > 1 && (
            <button
              onClick={handleBack}
              className="border border-gray-500 text-gray-500 bg-white px-4 py-2 rounded-md hover:bg-gray-50 transition mr-4"
            >
              Back
            </button>
          )}
          <Button onClick={handleNext}>
            {currentPage === 1
              ? "Next - Add Customer Managed Policies"
              : currentPage === 2
              ? "Next - Cost and Usage Report"
              : "Finish"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Onboarding;
