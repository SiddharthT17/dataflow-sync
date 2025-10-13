// src/pages/ConnectorSuccess.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConnectorSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">All connection tests passed!</p>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate(`/connector/${id}/setup`)}
          className="px-5 py-2 border rounded-lg"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/connectors")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConnectorSuccess;
