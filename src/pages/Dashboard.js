import React from "react";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to DataFlow Sync. Use the navigation to start setting up connectors or selecting tables.
      </Typography>
    </Box>
  );
}
