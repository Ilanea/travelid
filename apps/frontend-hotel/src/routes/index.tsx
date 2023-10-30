import { Route, Routes } from 'react-router-dom';

import Report from '@hotel/features/HotelPage/pages/Report';
import RequireAuth from '@hotel/features/auth/components/require-auth';
import Bookings from '@hotel/features/bookings/pages/bookings';
import Dashboard from '@hotel/features/dashboard/pages/dashboard';
import HotelProfile from '@hotel/features/hotel-profile/pages/hotel-profile';
import NotFound from '@hotel/features/misc/pages/not-found';
import Reports from '@hotel/features/reports/page/reports';

import SignIn from '../features/auth/pages/signin';
import SignUp from '../features/auth/pages/signup';
import { Role } from '../features/auth/types';
import ExamplePage from '../features/example/pages/Example';
import SettingsPage from '../features/settings/pages/settings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />

      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={[Role.GUEST, Role.ADMIN]} />}>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotel-profile" element={<HotelProfile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}></Route>
    </Routes>
  );
};
