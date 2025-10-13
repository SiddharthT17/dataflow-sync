// import React from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Box,
// } from "@mui/material";
// import { mockApi } from "../api/mockApi";
// import { useFetch } from "../hooks/useFetch";
// import { Loader } from "../components/Loader";

// const ConnectorSetup = () => {
//   const { data: connectors, loading, error } = useFetch(mockApi.getConnectors);

//   if (loading) return <Loader label="Fetching connectors..." />;
//   if (error) return <Typography color="error">Failed to load data.</Typography>;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h6" mb={2}>
//           Connector Setup
//         </Typography>
//         <List>
//           {connectors.map((c) => (
//             <ListItem
//               key={c.id}
//               secondaryAction={
//                 <Button
//                   variant={c.status === "connected" ? "outlined" : "contained"}
//                   size="small"
//                 >
//                   {c.status === "connected" ? "Connected" : "Connect"}
//                 </Button>
//               }
//             >
//               <ListItemText
//                 primary={c.name}
//                 secondary={`Status: ${c.status}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//         <Box mt={3}>
//           <Button variant="contained">Next</Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default ConnectorSetup;

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import api from "../api/apiClient";

// const ConnectorSetup = () => {
//   const [connectors, setConnectors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchConnectors = async () => {
//       try {
//         const response = await api.get("/connectors");
//         setConnectors(response.data);
//       } catch (error) {
//         console.error("Error fetching connectors:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConnectors();
//   }, []);

//   if (loading) {
//     return (
//       <Container sx={{ mt: 10, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography variant="body1" mt={2}>
//           Loading available connectors...
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ mt: 8 }}>
//       <Typography variant="h4" gutterBottom>
//         Available Connectors
//       </Typography>
//       <Grid container spacing={3}>
//         {connectors.map((connector) => (
//           <Grid item xs={12} sm={6} md={4} key={connector.id}>
//             <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h6">{connector.name}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {connector.description}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => alert(`Setup for ${connector.name} coming soon!`)}
//                 >
//                   Setup Connector
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default ConnectorSetup;
// src/pages/ConnectorSetup.js
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const connectorConfigs = {
//   netsuite: {
//     name: "NetSuite SuiteAnalytics",
//     description:
//       "Follow the setup guide to connect your NetSuite data source to DataFlow Sync.",
//     fields: [
//       { name: "consumerKey", label: "Consumer Key", required: true },
//       { name: "consumerSecret", label: "Consumer Secret", required: true },
//       { name: "tokenId", label: "Token ID", required: true },
//       { name: "tokenSecret", label: "Token Secret", required: true },
//       { name: "roleId", label: "Role ID", required: true },
//     ],
//     guide: [
//       "A NetSuite administrator account",
//       "SuiteAnalytics Connect Service enabled",
//       "NetSuite login credentials",
//     ],
//   },
//   salesforce: {
//     name: "Salesforce",
//     description:
//       "Connect your Salesforce account to sync CRM data securely to DataFlow Sync.",
//     fields: [
//       { name: "clientId", label: "Client ID", required: true },
//       { name: "clientSecret", label: "Client Secret", required: true },
//       { name: "accessToken", label: "Access Token", required: true },
//     ],
//     guide: [
//       "Salesforce admin access",
//       "API permissions enabled",
//       "OAuth credentials created in Salesforce",
//     ],
//   },
// };

// useEffect(() => {
//   const fetchConnectors = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/connectors");
//       const connectors = Array.isArray(response.data) ? response.data : [];
//       setConnectors(connectors);
//     } catch (err) {
//       console.error("Error fetching connectors:", err);
//     }
//   };
//   fetchConnectors();
// }, []);


// const ConnectorSetup = () => {
//   const { id } = useParams(); // e.g., "netsuite" or "salesforce"
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [isTesting, setIsTesting] = useState(false);

//   const connector = connectorConfigs[id];

//   if (!connector || !connector.name) {
//   console.error("Invalid connector data:", connector);
//   <div className="p-8">Invalid connector.</div>;
//   return alert("Invalid connector.");
// }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleTest = () => {
//     setIsTesting(true);
//     setTimeout(() => {
//       navigate(`/connector/${id}/testing`);
//     }, 1200);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
//         <h1 className="text-xl font-semibold text-gray-800">DataFlow Sync</h1>
//         <button
//           onClick={() => navigate("/connectors")}
//           className="text-blue-600 text-sm font-medium"
//         >
//           ← Back
//         </button>
//       </header>

//       <main className="flex flex-1 overflow-hidden">
//         {/* Left Panel: Form */}
//         <div className="w-2/3 p-8 overflow-y-auto border-r">
//           <h2 className="text-2xl font-bold mb-2">{connector.name}</h2>
//           <p className="text-gray-600 mb-6">{connector.description}</p>

//           <div className="space-y-4">
//             {connector.fields.map((field) => (
//               <div key={field.name}>
//                 <label className="block text-gray-700 text-sm font-medium mb-1">
//                   {field.label} {field.required && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                   name={field.name}
//                   onChange={handleChange}
//                   value={formData[field.name] || ""}
//                   type="text"
//                   className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
//                   required={field.required}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="mt-8">
//             <button
//               onClick={handleTest}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
//             >
//               SAVE & TEST
//             </button>
//           </div>
//         </div>

//         {/* Right Panel: Setup Guide */}
//         <div className="w-1/3 p-8 bg-white overflow-y-auto">
//           <h3 className="text-lg font-semibold mb-3">Setup Guide</h3>
//           <p className="text-gray-600 mb-4">
//             Follow our setup guide to connect {connector.name} to DataFlow Sync.
//           </p>
//           <ul className="list-disc ml-5 space-y-2 text-gray-700">
//             {connector.guide.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ConnectorSetup;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, CircularProgress, Card, CardContent } from "@mui/material";

const ConnectorSetup = () => {
  const [connectors, setConnectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // 🔹 Fetch connectors from mock backend
  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:5000/api/connectors");

        if (Array.isArray(response.data)) {
          setConnectors(response.data);
        } else {
          console.warn("Invalid connector data:", response.data);
          setConnectors([]);
        }
      } catch (err) {
        console.error("Error fetching connectors:", err);
        setError("Unable to load connectors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnectors();
  }, [retryCount]);

  // 🔁 Retry button handler
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // 🔹 UI for loading state
  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        flexDirection="column"
      >
        <CircularProgress size={48} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading available connectors...
        </Typography>
      </Box>
    );
  }

  // 🔹 UI for error state
  if (error) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        flexDirection="column"
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleRetry}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // 🔹 UI for empty state
  if (connectors.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        flexDirection="column"
      >
        <Typography variant="h6" color="textSecondary">
          No connectors found.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleRetry}
        >
          Refresh
        </Button>
      </Box>
    );
  }

  // 🔹 Normal list rendering
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Available Connectors
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
        {connectors.map((connector) => (
          <Card key={connector.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">{connector.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {connector.status || "unknown"}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => alert(`Selected: ${connector.name}`)}
              >
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ConnectorSetup;
