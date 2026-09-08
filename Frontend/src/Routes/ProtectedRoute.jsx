import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(UserContext);

  if (!user || !token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};