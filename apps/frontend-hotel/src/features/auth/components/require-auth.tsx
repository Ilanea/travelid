import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '../hooks/use-auth';
import { Role } from '../types';

type RequireAuthProps = {
  allowedRoles?: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('auth', auth);

  if (!auth?.accessToken) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles?.includes(auth?.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
