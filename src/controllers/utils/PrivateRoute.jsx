import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../models/contexts/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading || (!loading && user)) {
    return <Outlet />;
  }

  const redirectTo = location.pathname.startsWith("/organizer")
    ? "/organizer/login"
    : "/signin";

  return <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;