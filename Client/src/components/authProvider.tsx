import React, { useState } from "react";
import AuthContext from "../authContext";

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username: string, password: string) => {
    // Call your login API here
    // If login is successful, set the user state
    setUser({ username });
  };

  const logout = () => {
    // Clear the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
