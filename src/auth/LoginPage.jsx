import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password, remember);
  };

  return (
    <Box sx={{ maxWidth: 380, mx: "auto", mt: 12, p: 3, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
          label="Remember me"
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Sign In</Button>
      </form>
    </Box>
  );
}
