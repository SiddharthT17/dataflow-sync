import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";

const SchemaHandling = () => {
  const [option, setOption] = useState("allow_all");

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" mb={2}>
          Schema Change Handling
        </Typography>
        <Typography variant="body2" mb={3}>
          Choose how to handle schema updates when source data changes.
        </Typography>

        <RadioGroup value={option} onChange={(e) => setOption(e.target.value)}>
          <FormControlLabel
            value="allow_all"
            control={<Radio />}
            label="Allow All Changes"
          />
          <FormControlLabel
            value="columns_only"
            control={<Radio />}
            label="Allow Column Updates Only"
          />
          <FormControlLabel
            value="block_all"
            control={<Radio />}
            label="Block All Changes"
          />
        </RadioGroup>

        <Box mt={3}>
          <Button variant="contained">Continue</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SchemaHandling;
