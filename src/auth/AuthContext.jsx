// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   // restore session if “remember me” was used
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("session"));
//     if (saved?.token) {
//       setUser(saved.user);
//       setToken(saved.token);
//     }
//   }, []);

//   const login = (email, password, remember) => {
//     // mock authentication
//     const mockToken = "mock-jwt-token";
//     const userObj = { email };
//     setUser(userObj);
//     setToken(mockToken);

//     if (remember) {
//       localStorage.setItem("session", JSON.stringify({ user: userObj, token: mockToken }));
//     }
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("session");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  const login = (email, password) => {
    // ✅ Use demo credentials
    if (
      (email === "admin@dataflowsync.com" && password === "Admin@123") ||
      (email === "admin@demo.com" && password === "password")
    ) {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/connectors");
      return true;
    } else {
      alert("Invalid email or password!");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

