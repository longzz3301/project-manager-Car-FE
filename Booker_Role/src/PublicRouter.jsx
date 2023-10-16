import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = (props) => {
  const userLoggedIn = () => {
    const token = localStorage.getItem("token"); // User da login
    if (token) return true;
    return false;
  };

  if (userLoggedIn()) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;