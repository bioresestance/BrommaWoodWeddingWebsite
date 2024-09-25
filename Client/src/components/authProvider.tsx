import React, { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import AuthContext from "../authContext";
import useLoginGuest from "../hooks/useLoginGuest";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const { mutateAsync } = useLoginGuest();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (!decodedToken) {
          throw new Error("Token is invalid");
        }
        if (decodedToken.exp === undefined) {
          throw new Error("Token has no expiration date");
        }
        const expirationDate = new Date(decodedToken.exp * 1000);
        if (new Date() < expirationDate) {
          setUser("guest");
        } else {
          console.log("Token expired");
          Cookies.remove("token");
        }
      } catch (error) {
        console.error(error);
        Cookies.remove("token");
      }
    }
  }, []);

  const login = async (password: string) => {
    try {
      const response = await mutateAsync(password);
      // If login is successful, set the user state and store the token in a cookie
      const token = response.data.access_token;
      Cookies.set("token", token);
      setUser("guest");
      return true;
    } catch (error) {
      return false;
    }
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
