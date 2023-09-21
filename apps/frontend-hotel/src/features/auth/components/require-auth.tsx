import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { Role } from '../types';
import useAuth from '../hooks/use-auth';

type RequireAuthProps = {
  allowedRoles?: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles?.includes(auth?.user.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
