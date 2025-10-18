// /dataflow-sync/server/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock connector list
let connectors = [
  {
    id: "postgres",
    name: "PostgreSQL",
    status: "connected",
    icon: "/icons/postgres.svg",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    status: "disconnected",
    icon: "/icons/snowflake.svg",
  },
  {
    id: "bigquery",
    name: "BigQuery",
    status: "connected",
    icon: "/icons/bigquery.svg",
  },
];

// GET all connectors
app.get("/api/connectors", (req, res) => {
  res.json(connectors);
});

// PATCH: Toggle connector connection status
app.patch("/api/connect/:id", (req, res) => {
  const { id } = req.params;
  const connector = connectors.find((c) => c.id === id);
  if (!connector) return res.status(404).json({ message: "Connector not found" });

  connector.status = connector.status === "connected" ? "disconnected" : "connected";
  res.json(connector);
});

app.listen(5000, () => console.log("✅ Mock backend running on port 5000"));
