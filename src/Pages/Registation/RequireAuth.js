import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const usertoken = localStorage.getItem("accessToken");

  if (!usertoken) {
    return (
      <Navigate to="/signIn" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default RequireAuth;
