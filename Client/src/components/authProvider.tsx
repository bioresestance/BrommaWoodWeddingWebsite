import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../authContext";

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token, { header: true });
      const expirationDate = new Date(decodedToken.exp * 1000);
      if (new Date() < expirationDate) {
        setUser({ username: decodedToken.username });
      } else {
        Cookies.remove("token");
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Call your login API here
    // If login is successful, set the user state and store the token in a cookie
    const token = "your jwt token";
    Cookies.set("token", token);
    setUser({ username });
  };

  const logout = () => {
    // Clear the user state and remove the token from the cookies
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
