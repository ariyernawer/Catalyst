import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, role } = useAuthContext();

  if (user) {
    return <Navigate to={role === "organizer" ? "/organizer" : "/discover"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;