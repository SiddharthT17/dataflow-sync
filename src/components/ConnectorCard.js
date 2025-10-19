import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const mockMetadata = [
  {
    name: "admin_alerts",
    columns: [
      { name: "id", typeName: "BIGINT", standardDataType: "BIGINT" },
      { name: "action", typeName: "VARCHAR", standardDataType: "STRING" },
      { name: "alert_text", typeName: "VARCHAR", standardDataType: "STRING" },
      { name: "created_date", typeName: "DATETIME", standardDataType: "TIMESTAMP" },
      { name: "is_resolved", typeName: "BIT", standardDataType: "BOOLEAN" },
      { name: "amount", typeName: "DECIMAL", standardDataType: "DECIMAL" },
    ],
    primaryKeyColumnNames: ["id"],
  },
];

const ConnectorCard = ({ connector }) => {
  const [open, setOpen] = useState(false);
  const [metadata, setMetadata] = useState([]);

  const handleViewMetadata = async () => {
    try {
      // For now we use mock data; later replace with:
      // const res = await axios.get(`http://localhost:8080/v0/api/database/metadata/${connector.id}`);
      setMetadata(mockMetadata);
      setOpen(true);
    } catch (err) {
      console.error("Error fetching metadata:", err);
    }
  };

  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {connector.name}
        </Typography>
        <Typography color={connector.connected ? "green" : "red"} fontWeight="medium" mb={1}>
          {connector.connected ? "Connected" : "Disconnected"}
        </Typography>

        {connector.connected && (
          <Button variant="outlined" onClick={handleViewMetadata}>
            View Metadata
          </Button>
        )}
      </CardContent>

      {/* Metadata Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Metadata: {metadata[0]?.name}</DialogTitle>
        <DialogContent>
          {metadata.map((table, i) => (
            <Box key={i} mb={3}>
              <Typography variant="h6" mt={1}>
                Table: {table.name}
              </Typography>
              <Table>
                <TableBody>
                  {table.columns.map((col, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{col.name}</TableCell>
                      <TableCell>{col.standardDataType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ConnectorCard;
