import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConnectorCard from "../components/ConnectorCard";

const ConnectorSetup = () => {
  const [connectors, setConnectors] = useState([]);
  const [filteredConnectors, setFilteredConnectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newConnection, setNewConnection] = useState({
    sourceType: "MYSQL",
    targetType: "SNOWFLAKE",
    host: "127.0.0.1",
    port: "3306",
    database: "radianreporting",
    username: "root",
    password: "",
  });

  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/connectors");
        const connectors = Array.isArray(response.data) ? response.data : [];
        setConnectors(connectors);
        setFilteredConnectors(connectors);
      } catch (err) {
        console.error("Error fetching connectors:", err);
      }
    };
    fetchConnectors();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let result = connectors;

    if (filterStatus !== "All") {
      result = result.filter(
        (c) => (filterStatus === "Connected" ? c.connected : !c.connected)
      );
    }

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredConnectors(result);
  }, [searchTerm, filterStatus, connectors]);

  // ➕ Connect handler
  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/v0/api/database/connection",
        {
          host: newConnection.host,
          port: newConnection.port,
          database: newConnection.database,
          username: newConnection.username,
          password: newConnection.password,
          databaseType: newConnection.sourceType,
        }
      );

      const success = res.data === true;

      const newConn = {
        id: connectors.length + 1,
        name: `${newConnection.sourceType} → ${newConnection.targetType}`,
        connected: success,
        type: "Database",
      };

      setConnectors([...connectors, newConn]);
      setOpenModal(false);
    } catch (err) {
      console.error("Connection failed:", err);
      alert("Failed to connect — backend unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Available Connectors
      </Typography>

      {/* 🔍 Filter Bar */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4, alignItems: "center" }}>
        <TextField
          label="Search connectors..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 220 }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Connected">Connected</MenuItem>
            <MenuItem value="Disconnected">Disconnected</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Add Database Connector
        </Button>
      </Box>

      {/* 🧩 Connectors Grid */}
      <Grid container spacing={3}>
        {filteredConnectors.map((connector) => (
          <Grid item xs={12} sm={6} md={4} key={connector.id}>
            <ConnectorCard connector={connector} />
          </Grid>
        ))}
      </Grid>

      {/* ➕ Connect Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connect Source to Target</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Source</InputLabel>
              <Select
                label="Source"
                value={newConnection.sourceType}
                onChange={(e) =>
                  setNewConnection({ ...newConnection, sourceType: e.target.value })
                }
              >
                <MenuItem value="MYSQL">MySQL</MenuItem>
                <MenuItem value="ORACLE">Oracle</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Target</InputLabel>
              <Select
                label="Target"
                value={newConnection.targetType}
                onChange={(e) =>
                  setNewConnection({ ...newConnection, targetType: e.target.value })
                }
              >
                <MenuItem value="SNOWFLAKE">Snowflake</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Connection Fields */}
          <TextField
            margin="dense"
            label="Host"
            fullWidth
            value={newConnection.host}
            onChange={(e) => setNewConnection({ ...newConnection, host: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Port"
            fullWidth
            value={newConnection.port}
            onChange={(e) => setNewConnection({ ...newConnection, port: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Database"
            fullWidth
            value={newConnection.database}
            onChange={(e) => setNewConnection({ ...newConnection, database: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={newConnection.username}
            onChange={(e) => setNewConnection({ ...newConnection, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newConnection.password}
            onChange={(e) => setNewConnection({ ...newConnection, password: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            onClick={handleConnect}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            {loading ? "Connecting..." : "Connect"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectorSetup;
