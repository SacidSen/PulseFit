import React from "react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
}) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
