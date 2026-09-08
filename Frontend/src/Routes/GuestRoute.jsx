import { Navigate } from "react-router-dom";

export const GuestRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    return <Navigate to="/Dashboard" replace />;
  }

  return children;
};
