import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Chip, Avatar } from "@mui/material";

export default function ConnectorCard({ connector, onToggle }) {
  const { id, name, status, icon } = connector;
  const isConnected = status === "connected";

  return (
    <Card
      sx={{
        width: 260,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Avatar
          src={icon}
          alt={name}
          sx={{
            width: 64,
            height: 64,
            margin: "0 auto 12px",
            bgcolor: "#f4f4f4",
          }}
        />
        <Typography variant="h6" sx={{ mb: 1 }}>
          {name}
        </Typography>
        <Chip
          label={isConnected ? "Connected" : "Disconnected"}
          color={isConnected ? "success" : "error"}
          size="small"
          sx={{ mb: 2 }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onToggle(id)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            bgcolor: isConnected ? "warning.main" : "primary.main",
          }}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </CardActions>
    </Card>
  );
}
