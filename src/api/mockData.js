export const connectors = [
  { id: 1, name: "NetSuite", status: "connected" },
  { id: 2, name: "Salesforce", status: "disconnected" },
  { id: 3, name: "QuickBooks", status: "connected" },
];

export const tables = [
  { id: 1, name: "Customers" },
  { id: 2, name: "Invoices" },
  { id: 3, name: "Payments" },
  { id: 4, name: "Vendors" },
];

export const syncStatus = {
  inProgress: true,
  progress: 65,
  lastRun: "2025-10-10T13:45:00Z",
};
