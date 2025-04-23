import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Stack, Link } from "@mui/material";
import CopyBlock from "../components/CopyBlock";
import Input from "../components/Input";
import Button from "../components/Button";

const Onboarding = () => {
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
    if (!roleArn.trim()) {
      setTouched(true);
      setError("Role ARN is required.");
      return;
    }
    navigate("/onboarding/policies", { state: { roleArn } });
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
        {/* Steps 1-6 */}
        {[...Array(6)].map((_, index) => (
          <Box key={index} mt={index === 0 ? 0 : 4}>
            <StepContent
              step={index + 1}
              roleArn={roleArn}
              setRoleArn={setRoleArn}
              handleBlur={handleBlur}
              touched={touched}
              error={error}
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
        <Button onClick={handleNext}>
          Next - Add Customer Managed Policies
        </Button>
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

const StepContent = ({
  step,
  roleArn,
  setRoleArn,
  handleBlur,
  touched,
  error,
}) => {
  switch (step) {
    case 1:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={1} />
          <Typography variant="body1">
            Log into AWS account and{" "}
            <Link
              href="#"
              underline="always"
              sx={{ color: "blue", fontWeight: 500 }}
            >
              create an IAM Role
            </Link>
          </Typography>
        </Stack>
      );
    case 2:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={2} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={1}>
              In the <span className="italic">Trusted entity type section</span>
              , select{" "}
              <span className="font-semibold">Custom trust policy</span>.
              Replace the prefilled policy with the policy provided below -
            </Typography>
            <CopyBlock
              content={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`}
              height="250px"
              width="100%"
              buttonPosition="top-right"
            />
          </Box>
        </Stack>
      );
    case 3:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={3} />
          <Typography variant="body1">
            Click on <span className="font-semibold">Next</span> to go to the{" "}
            <span className="italic">Add permissions page.</span> We would not
            be adding any permissions for now because the permission policy
            content will be dependent on the AWS Account ID retrieved from the
            IAM Role. Click on <span className="font-semibold">Next.</span>
          </Typography>
        </Stack>
      );
    case 4:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={4} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={1}>
              In the <span className="italic">Role name field</span>, enter the
              below-mentioned role name, and click on{" "}
              <span className="font-semibold">Create Role</span>
            </Typography>
            <CopyBlock
              content="CK-Tuner-role-dev-2"
              height="55px"
              width="270px"
              buttonPosition="right"
            />
          </Box>
        </Stack>
      );
    case 5:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={5} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={2}>
              Go to the newly created IAM role and copy the role ARN.
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 300,
                backgroundColor: "#e0e0e0",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#757575",
                fontSize: 16,
              }}
            >
              Placeholder for screenshot/image
            </Box>
          </Box>
        </Stack>
      );
    case 6:
      return (
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={6} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={2}>
              Paste the copied Role ARN below -
            </Typography>
            <Box sx={{ width: "40%" }}>
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
          </Box>
        </Stack>
      );
    default:
      return null;
  }
};

export default Onboarding;
