import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { MainLayout } from '@hotel/components/layout/main-layout';

import { useAuthStore } from '../store/auth';
import { Role } from '../types';

type RequireAuthProps = {
  allowedRoles?: Role[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const authUser = useAuthStore((state) => state.user);
  const location = useLocation();

  console.log('authUser', authUser);

  if (!authUser) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (allowedRoles?.includes(authUser?.role)) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  } else {
    return <Navigate to="/unauthorized2" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
