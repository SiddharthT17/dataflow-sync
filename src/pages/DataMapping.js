import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Box,
} from "@mui/material";

const DataMapping = () => {
  const [mappings, setMappings] = useState([
    { source: "Customer_Name", target: "client_name" },
    { source: "Invoice_ID", target: "invoice_number" },
    { source: "Amount", target: "total_amount" },
  ]);

  const handleChange = (index, value) => {
    const updated = [...mappings];
    updated[index].target = value;
    setMappings(updated);
  };

  const handleSave = () => {
    alert("Mappings saved (mock)!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" mb={3}>
          Data Mapping
        </Typography>
        <Grid container spacing={2}>
          {mappings.map((map, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Source Field"
                  value={map.source}
                  disabled
                />
              </Grid>
              <Grid item xs={1}>
                <Typography align="center" sx={{ mt: 2 }}>
                  →
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Destination Field"
                  value={map.target}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Box mt={4}>
          <Button variant="contained" onClick={handleSave}>
            Save Mapping
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DataMapping;
