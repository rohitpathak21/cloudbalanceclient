import React from "react";
import { Typography, Link } from "@mui/material";

const stepsConfig = [
  {
    stepNumber: 1,
    content: (
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
    ),
  },
  {
    stepNumber: 2,
    content: (
      <Typography variant="body1" mb={1}>
        In the <span className="italic">Trusted entity type section</span>,
        select <span className="font-semibold">Custom trust policy</span>.
        Replace the prefilled policy with the policy provided below:
      </Typography>
    ),
    copyContent: `{
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
}`,
    copyDimensions: { width: "100%", height: "250px" },
    copyButtonPosition: "top-right",
  },
  {
    stepNumber: 3,
    content:
      "Click on Next to go to the Add permissions page. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on Next.",
  },
  {
    stepNumber: 4,
    content: (
      <Typography variant="body1" mb={1}>
        In the <span className="italic">Role name field</span>, enter the below
        mentioned role name and click on <span className="font-semibold">Create Role</span>
      </Typography>
    ),
    copyContent: "CK-Tuner-role-dev-2",
    copyDimensions: { width: "270px", height: "55px" },
    copyButtonPosition: "right",
  },
  {
    stepNumber: 5,
    content: "Go to the newly created IAM role and copy the role ARN.",
    image: "placeholder-image-url.jpg",
    imageDimensions: { width: "100%", height: "300px" },
  },
  {
    stepNumber: 6,
    content: "Paste the copied Role ARN below.",
  },
];

const onboardingPoliciesConfig = [
  {
    stepNumber: 1,
    content: (
      <>
        Go to the{" "}
        <a
          href="https://console.aws.amazon.com/iam/home#/policies$new"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", fontWeight: 500, textDecoration: "underline" }}
        >
          Create policy
        </a>{" "}
        page.
      </>
    ),
  },
  {
    stepNumber: 2,
    content: (
      <>
        Click on the <strong>JSON</strong> tab and paste the following policy and press <strong>Next</strong>.
      </>
    ),
    copyContent: `{
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
}`,
    copyDimensions: { height: "200px", width: "1400px" },
  },
  {
    stepNumber: 3,
    content: (
      <>
        In the <strong>Name</strong> field, enter below mentioned policy name and click Enter.
      </>
    ),
    copyContent: "CK-Tuner-role-dev-2",
    copyDimensions: { height: "55px", width: "270px" },
    copyButtonPosition: "right",
  },
  {
    stepNumber: 4,
    content: (
      <>
        Again go to the{" "}
        <span style={{ textDecoration: "underline", color: "blue" }}>Create policy</span> page.
      </>
    ),
  },
  {
    stepNumber: 5,
    content: (
      <>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next
      </>
    ),
    copyContent: `{
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
}`,
    copyDimensions: { height: "200px", width: "1400px" },
  },
  {
    stepNumber: 6,
    content: (
      <>
        In the <strong>Name</strong> field, enter below mentioned policy name and click Enter.
      </>
    ),
    copyContent: "CK-Tuner-role-dev-2",
    copyDimensions: { height: "55px", width: "270px" },
    copyButtonPosition: "right",
  },
  {
    stepNumber: 7,
    content: (
      <>
        Again go to the{" "}
        <span style={{ textDecoration: "underline", color: "blue" }}>Create policy</span> page.
      </>
    ),
  },
  {
    stepNumber: 8,
    content: (
      <>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next
      </>
    ),
    copyContent: `{
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
}`,
    copyDimensions: { height: "200px", width: "1400px" },
  },
  {
    stepNumber: 9,
    content: (
      <>
        In the <strong>Name</strong> field, enter below mentioned policy name and click Enter.
      </>
    ),
    copyContent: "CK-Tuner-role-dev-2",
    copyDimensions: { height: "55px", width: "270px" },
    copyButtonPosition: "right",
  },
  {
    stepNumber: 10,
    content: (
      <>
        Go to the <span style={{ textDecoration: "underline", color: "blue" }}>CK Tuner Role</span>
      </>
    ),
    image: "/images/step10.png",
    imageDimensions: { width: "100%", height: "300px" },
  },
  {
    stepNumber: 11,
    content: (
      <>
        In Permission policies, click on <strong>Add Permissions &gt; Attach policy</strong>
      </>
    ),
    image: "/images/step11.png",
    imageDimensions: { width: "100%", height: "300px" },
  },
  {
    stepNumber: 12,
    content: (
      <>
        Filter by Type &gt; customer managed then search for <strong>cktuner - CostAuditPolicy, cktuner - SecAuditPolicy, cktuner - TuneReadEssentials</strong> and read them.
      </>
    ),
    image: "/images/step12.png",
    imageDimensions: { width: "100%", height: "300px" },
  },
  {
    stepNumber: 13,
    content: (
      <>
        Now click on <strong>Add Permissions</strong>
      </>
    ),
  },
  {
    stepNumber: 14,
    content: (
      <>
        In Permission policies, click on <strong>Add Permission &gt; Create Policy</strong>
      </>
    ),
    image: "/images/step14.png",
    imageDimensions: { width: "100%", height: "300px" },
  },
  {
    stepNumber: 15,
    content: (
      <>
        Click on the <strong>JSON</strong> tab and paste the following policy and click on Next
      </>
    ),
    copyContent: `{
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
}`,
    copyDimensions: { height: "200px", width: "1400px" },
  },
  {
    stepNumber: 16,
    content: (
      <>
        Now click on <strong>Review</strong> policy.
      </>
    ),
  },
  {
    stepNumber: 17,
    content: (
      <>
        In the <strong>Name</strong> field, enter below mentioned policy name and click Enter.
      </>
    ),
    copyContent: "CK-Tuner-role-dev-2",
    copyDimensions: { height: "55px", width: "270px" },
    copyButtonPosition: "right",
  },
];

const onboardingCURConfig = [
  {
    stepNumber: 1,
    content: (
      <>
        Go to the <strong>Cost and Usage Reports</strong> in the Billing
        Dashboard and click on <strong>Create Report</strong>.
      </>
    ),
  },
  {
    stepNumber: 2,
    content: (
      <>
        Name the report as shown below and select the{" "}
        <strong>Include resource IDs</strong> checkbox:
      </>
    ),
    copyContent: "MyCostReport",
    copyDimensions: { height: "40px", width: "200px" },
    copyButtonPosition: "right",
    image: "https://via.placeholder.com/1000x500",
    imageDimensions: { width: "100%" },
  },
  {
    stepNumber: 3,
    content: (
      <>
        In <strong>Configure S3 bucket</strong>, provide the name of the S3
        bucket that was created.
      </>
    ),
    image: "https://via.placeholder.com/1000x500",
    imageDimensions: { width: "100%" },
  },
  {
    stepNumber: 4,
    content: (
      <>
        In the <strong>Delivery options</strong> section, enter the
        below-mentioned <strong>Report path prefix</strong>:
        <br />
        <em>Report path prefix:</em>
      </>
    ),
    copyContent: "cur-data",
    copyDimensions: { height: "40px", width: "200px" },
    copyButtonPosition: "right",
    image: "https://via.placeholder.com/1000x500",
    imageDimensions: { width: "100%" },
  },
  {
    stepNumber: 5,
    content: (
      <>
        Click on <strong>Next</strong>. Now review the configuration of the
        Cost and Usage Report. Once satisfied, click on{" "}
        <strong>Create Report</strong>.
      </>
    ),
  },
];



export { onboardingPoliciesConfig, stepsConfig , onboardingCURConfig};
