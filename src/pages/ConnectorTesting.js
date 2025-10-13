// src/pages/ConnectorTesting.js
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ConnectorTesting = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/connector/${id}/success`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Connecting to API...</h2>
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-500 mt-3">Testing connection with {id}...</p>
    </div>
  );
};

export default ConnectorTesting;
