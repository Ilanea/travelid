import { Route, Routes } from 'react-router-dom';

import RequireAuth from '@hotel/features/auth/components/require-auth';
import NotFound from '@hotel/features/misc/pages/not-found';
import Reports from '@hotel/features/reports/page/reports';

import SignIn from '../features/auth/pages/signin';
import SignUp from '../features/auth/pages/signup';
import { Role } from '../features/auth/types';
import ExamplePage from '../features/example/pages/Example';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />

      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={[Role.USER, Role.ADMIN]} />}>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/example" element={<ExamplePage />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}></Route>
    </Routes>
  );
};
