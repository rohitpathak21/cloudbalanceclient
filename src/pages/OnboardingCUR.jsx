import React from "react";
import { Box, Typography, Paper, Stack, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CopyBlock from "../components/CopyBlock"; // Assuming this is your reusable copy block

const OnboardingCUR = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleNext = () => console.log("Next step");

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
        Create Cost & Usage Report
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Create a Cost and Usage Report by following these steps.
      </Typography>

      <Paper
        elevation={3}
        sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 4 }}
      >
        {/* Step 1 */}
        <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
          <StepNumber number={1} />
          <Typography variant="body1">
            Go to the <strong>Cost and Usage Reports</strong> in the Billing
            Dashboard and click on <strong>Create Report</strong>.
          </Typography>
        </Stack>

        {/* Step 2 */}
        <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
          <StepNumber number={2} />
          <Box>
            <Typography variant="body1" mb={1}>
              Name the report as shown below and select the{" "}
              <strong>Include resource IDs</strong> checkbox:
            </Typography>

            <CopyBlock
              content="MyCostReport"
              height="40px"
              width="200px"
              buttonPosition="right"
            />

            <Box mt={2}>
              <img
                src="https://via.placeholder.com/1000x500"
                alt="Step 2 screenshot"
                style={{ width: "100%", maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          </Box>
        </Stack>

        {/* Step 3 */}
        <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
          <StepNumber number={3} />
          <Box>
            <Typography variant="body1">
              In <strong>Configure S3 bucket</strong>, provide the name of the
              S3 bucket that was created.
            </Typography>
            <Box mt={2}>
              <img
                src="https://via.placeholder.com/1000x500"
                alt="Step 3 screenshot"
                style={{ width: "100%", maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          </Box>
        </Stack>

        {/* Step 4 */}
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={4} />
          <Box>
            <Typography variant="body1" mb={1}>
              In the <strong>Delivery options</strong> section, enter the
              below-mentioned <strong>Report path prefix</strong>:
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle="italic"
              mb={1}
            >
              Report path prefix:
            </Typography>

            <CopyBlock
              content="cur-data"
              height="40px"
              width="200px"
              buttonPosition="right"
            />

            <Box mt={2}>
              <img
                src="https://via.placeholder.com/1000x500"
                alt="Step 4 screenshot"
                style={{ width: "100%", maxWidth: "100%", borderRadius: 8 }}
              />
            </Box>
          </Box>
        </Stack>

        {/* Step 5 */}
        <Stack direction="row" alignItems="flex-start" spacing={2} mt={3}>
          <StepNumber number={5} />
          <Typography variant="body1">
            Click on <strong>Next</strong>. Now review the configuration of the
            Cost and Usage Report. Once satisfied, click on{" "}
            <strong>Create Report</strong>.
          </Typography>
        </Stack>
      </Paper>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

const StepNumber = ({ number }) => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      backgroundColor: "#e0e0e0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    }}
  >
    {number}
  </Box>
);

export default OnboardingCUR;
