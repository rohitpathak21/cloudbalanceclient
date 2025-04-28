import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import CopyBlock from "./CopyBlock";

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
      flexShrink: 0,
    }}
  >
    {number}
  </Box>
);

const Step = ({
  stepNumber,
  content,
  image,
  imageDimensions,
  copyContent,
  copyDimensions,
  copyButtonPosition,
}) => {
  return (
    <Box mb={6}>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <StepNumber number={stepNumber} />
        <Box sx={{ flex: 1 }}>
          {/* Main Text/Content */}
          {typeof content === "string" ? (
            <Typography variant="body1" mb={copyContent || image ? 2 : 0}>
              {content}
            </Typography>
          ) : (
            <Box mb={copyContent || image ? 2 : 0}>{content}</Box>
          )}

          {/* CopyBlock if available */}
          {copyContent && (
            <Box mb={image ? 2 : 0}>
              <CopyBlock
                content={copyContent}
                height={copyDimensions?.height || "200px"}
                width={copyDimensions?.width || "100%"}
                buttonPosition={copyButtonPosition || "right"}
              />
            </Box>
          )}

          {/* Image if available */}
          {image && (
            <Box
              component="img"
              src={image}
              alt="Step illustration"
              sx={{
                width: imageDimensions?.width || "100%",
                height: imageDimensions?.height || "auto",
                borderRadius: 2,
                display: "block",
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Step;
