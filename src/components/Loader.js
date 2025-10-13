import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

export const Loader = ({ label = "Loading..." }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="60vh"
  >
    <CircularProgress size={40} />
    <Typography variant="body2" mt={2}>
      {label}
    </Typography>
  </Box>
);
