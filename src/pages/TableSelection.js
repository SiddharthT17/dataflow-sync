import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { mockApi } from "../api/mockApi";
import { useFetch } from "../hooks/useFetch";
import { Loader } from "../components/Loader";

const TableSelection = () => {
  const { data: tables, loading } = useFetch(mockApi.getTables);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (name) =>
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  if (loading) return <Loader label="Fetching tables..." />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          Select Tables to Sync
        </Typography>

        {tables.map((t) => (
          <FormControlLabel
            key={t.id}
            control={
              <Checkbox
                checked={selected.includes(t.name)}
                onChange={() => toggleSelect(t.name)}
              />
            }
            label={t.name}
          />
        ))}

        <Box mt={3}>
          <Button variant="contained">Save & Continue</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TableSelection;
