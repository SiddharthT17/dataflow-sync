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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ConnectorCard from "../components/ConnectorCard";

const ConnectorSetup = () => {
  const [connectors, setConnectors] = useState([]);
  const [filteredConnectors, setFilteredConnectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [newConnector, setNewConnector] = useState({ name: "", type: "" });

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

  // 🔍 Search + Filter logic
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

  // ➕ Modal handlers
  const handleAddConnector = () => {
    if (!newConnector.name.trim()) return;
    setConnectors([
      ...connectors,
      {
        id: connectors.length + 1,
        name: newConnector.name,
        connected: false,
        type: newConnector.type || "Custom",
      },
    ]);
    setNewConnector({ name: "", type: "" });
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Available Connectors
      </Typography>

      {/* 🔍 Filter Bar */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
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
          Add Connector
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

      {/* ➕ Add Connector Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add New Connector</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Connector Name"
            fullWidth
            value={newConnector.name}
            onChange={(e) =>
              setNewConnector({ ...newConnector, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Connector Type"
            fullWidth
            value={newConnector.type}
            onChange={(e) =>
              setNewConnector({ ...newConnector, type: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleAddConnector} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectorSetup;
