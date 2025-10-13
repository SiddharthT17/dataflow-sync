// import React from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <AppBar position="static" color="primary" elevation={1}>
//       <Toolbar>
//         <Typography
//           variant="h6"
//           sx={{ flexGrow: 1, cursor: "pointer" }}
//           onClick={() => navigate("/")}
//         >
//           DataFlow Sync
//         </Typography>
//         <Button color="inherit" onClick={() => navigate("/data-mapping")}>
//             Mapping
//         </Button>
//         <Button color="inherit" onClick={() => navigate("/sync-progress")}>
//             Sync
//         </Button>
// <       Button color="inherit" onClick={() => navigate("/history")}>
//         History
//         </Button>

//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "0.5px" }}
        >
          DataFlow Sync
        </Typography>
        {user && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


