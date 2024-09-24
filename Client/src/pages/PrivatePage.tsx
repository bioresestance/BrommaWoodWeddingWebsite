// PrivateRoute.tsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../authContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/rsvp" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
