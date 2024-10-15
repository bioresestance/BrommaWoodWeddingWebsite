import React from "react";

type AuthContextType = {
  user: string | null;
  logout: () => void;
  login: (credentials: string) => Promise<boolean>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
