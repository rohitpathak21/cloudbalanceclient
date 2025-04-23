import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Stack, Link } from "@mui/material";
import Button from "../components/Button";
import CopyBlock from "../components/CopyBlock"; // Ensure this path is correct

const OnboardingPolicies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roleArn = location.state?.roleArn || "";

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    console.log("Next step with roleArn:", roleArn);
    // navigate("/onboarding/next");
  };

  const examplePolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket",
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}`;

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
        Attach Customer Managed Policies
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        You can attach one or more customer managed policies to the IAM role you
        created.
      </Typography>

      <Paper
        elevation={3}
        sx={{ backgroundColor: "#fff", borderRadius: 2, padding: 4 }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
          <StepNumber number={1} />
          <Typography variant="body1">
            Go to the{" "}
            <Link
              href="https://console.aws.amazon.com/iam/home#/policies$new"
              target="_blank"
              underline="always"
              sx={{ color: "blue", fontWeight: 500 }}
            >
              Create policy
            </Link>{" "}
            page.
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={2} />
          <Box>
            <Typography variant="body1" mb={2}>
              Click on the <strong>JSON</strong> tab and paste the following
              policy and press <strong>Next</strong>.
            </Typography>
            <CopyBlock content={examplePolicy} height="200px" width="1400px" />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={3} />
          <Box>
            <Typography variant="body1" mb={2}>
              In the <span className="font-semibold">Name</span> field, enter
              below mentioned policy name and click Enter.
            </Typography>
            <CopyBlock
              content="CK-Tuner-role-dev-2"
              height="55px"
              width="270px"
              buttonPosition="right"
            />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={4} />
          <Box>
            <Typography variant="body1" mb={2}>
              Again go to the{" "}
              <span className="text-blue-700 underline">Create policy</span>{" "}
              page.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={5} />
          <Box>
            <Typography variant="body1" mb={2}>
              Click on the <span className="font-semibold">JSON</span> tab and
              paste the following policy and click on Next
            </Typography>
            <CopyBlock content={examplePolicy} height="200px" width="1400px" />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={6} />
          <Box>
            <Typography variant="body1" mb={2}>
              In the <span className="font-semibold">Name</span> field, enter
              below mentioned policy name and click Enter.
            </Typography>
            <CopyBlock
              content="CK-Tuner-role-dev-2"
              height="55px"
              width="270px"
              buttonPosition="right"
            />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={7} />
          <Box>
            <Typography variant="body1" mb={2}>
              Again go to the{" "}
              <span className="text-blue-700 underline">Create policy</span>{" "}
              page.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={8} />
          <Box>
            <Typography variant="body1" mb={2}>
              Click on the <span className="font-semibold">JSON</span> tab and
              paste the following policy and click on Next
            </Typography>
            <CopyBlock content={examplePolicy} height="200px" width="1400px" />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={9} />
          <Box>
            <Typography variant="body1" mb={2}>
              In the <span className="font-semibold">Name</span> field, enter
              below mentioned policy name and click Enter.
            </Typography>
            <CopyBlock
              content="CK-Tuner-role-dev-2"
              height="55px"
              width="270px"
              buttonPosition="right"
            />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <StepNumber number={10} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={4}>
              Go to the <span className="text-blue-900 underline">CK Tuner Role</span>
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

        <Stack direction="row" alignItems="flex-start" spacing={2} mt={4} mb={4}>
          <StepNumber number={11} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={2}>
              In Permission policies, click on <span className="font-semibold">Add Permissions {'>'} Attach policy</span>
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

        <Stack direction="row" alignItems="flex-start" spacing={2} >
          <StepNumber number={12} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={4}>
              Filter by Type {`>`} customer managed then search for <span className="font-semibold">cktuner - CostAuditPolicy, cktuner - SecAuditPolicy, cktuner - TuneReadEssentials</span> and read them.
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

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4} mt={4}>
          <StepNumber number={13} />
          <Box>
            <Typography variant="body1" mb={2}>
              Now click on <span className="font-semibold">Add Permissions</span>
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} >
          <StepNumber number={14} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" mb={4}>
              In Permission policies, click on <span className="font-semibold">Add Permission {`>`} Create Policy</span>
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

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4} mt={4}>
          <StepNumber number={15} />
          <Box>
            <Typography variant="body1" mb={2}>
              Click on the <span className="font-semibold">JSON</span> tab and
              paste the following policy and click on Next
            </Typography>
            <CopyBlock content={examplePolicy} height="200px" width="1400px" />
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4} mt={4}>
          <StepNumber number={16} />
          <Box>
            <Typography variant="body1" mb={2}>
              Now click on <span className="font-semibold">Review</span> policy.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={2} mb={4}>
          <StepNumber number={17} />
          <Box>
            <Typography variant="body1" mb={2}>
              In the <span className="font-semibold">Name</span> field, enter
              below mentioned policy name and click Enter.
            </Typography>
            <CopyBlock
              content="CK-Tuner-role-dev-2"
              height="55px"
              width="270px"
              buttonPosition="right"
            />
          </Box>
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

export default OnboardingPolicies;
