// mockServer.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. POST /v0/api/database/connection
app.post("/v0/api/database/connection", (req, res) => {
  console.log("Mock DB connection request:", req.body);

  const { host, databaseType } = req.body;

  // Fake logic – succeed for known good combos
  if (host && (databaseType === "MYSQL" || databaseType === "ORACLE")) {
    return res.json(true);
  }

  // Otherwise fail
  return res.json(false);
});

// ✅ 2. GET /v0/api/database/metadata/:connectionId
app.get("/v0/api/database/metadata/:connectionId", (req, res) => {
  console.log("Mock metadata request for:", req.params.connectionId);

  const metadata = [
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
      totalRecordsCount: 0,
    },
  ];

  res.json(metadata);
});

// ✅ 3. POST /v0/api/database/clone
app.post("/v0/api/database/clone", (req, res) => {
  console.log("Mock clone request:", req.body);
  res.sendStatus(200);
});

// Server start
const PORT = 8080;
app.listen(PORT, () => console.log(`✅ Mock backend running on port ${PORT}`));
