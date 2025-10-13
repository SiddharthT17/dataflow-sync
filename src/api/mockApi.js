// import axios from "axios";

// const api = axios.create();

// // Mock latency interceptor
// api.interceptors.response.use((response) => {
//   return new Promise((resolve) => setTimeout(() => resolve(response), 500));
// });

// export default api;


/**
 * mockApi.js
 * Simulates backend endpoints with latency
 */

import { connectors, tables, syncStatus } from "./mockData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  async getConnectors() {
    await delay(800);
    return { data: connectors };
  },

  async getTables() {
    await delay(600);
    return { data: tables };
  },

  async getSyncStatus() {
    await delay(1000);
    return { data: syncStatus };
  },

  async postConnection(payload) {
    await delay(1000);
    return { data: { success: true, connector: payload } };
  },
};
