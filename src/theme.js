import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f9fafb", paper: "#ffffff" },
  },
  shape: { borderRadius: 10 },
});

export default theme;
