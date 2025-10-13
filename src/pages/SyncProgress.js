import React from "react";
import {
  Container,
  Paper,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";
import { mockApi } from "../api/mockApi";
import { useFetch } from "../hooks/useFetch";
import { Loader } from "../components/Loader";

const SyncProgress = () => {
  const { data: status, loading } = useFetch(mockApi.getSyncStatus);

  if (loading) return <Loader label="Checking sync progress..." />;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" mb={3}>
          Sync Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={status.progress}
          sx={{ height: 10, borderRadius: 2 }}
        />
        <Typography mt={2}>{status.progress}% completed</Typography>
        <Box mt={2}>
          <Chip
            label={status.inProgress ? "In Progress" : "Completed"}
            color={status.inProgress ? "info" : "success"}
          />
        </Box>
        <Typography variant="body2" mt={2}>
          Last Run: {new Date(status.lastRun).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default SyncProgress;
