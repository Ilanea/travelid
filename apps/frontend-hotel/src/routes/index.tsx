import { Route, Routes } from 'react-router-dom';

import Report from '@hotel/features/HotelPage/pages/Report';
import RequireAuth from '@hotel/features/auth/components/require-auth';
import Bookings from '@hotel/features/bookings/pages/bookings';
import Dashboard from '@hotel/features/dashboard/pages/dashboard';
import HotelProfilePage from '@hotel/features/hotel-profile/pages/hotel-profile';
import NotFound from '@hotel/features/misc/pages/not-found';
import EditReward from '@hotel/features/rewards/pages/edit-reward';
import Rewards from '@hotel/features/rewards/pages/rewards';

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
      <Route
        element={
          <RequireAuth
            allowedRoles={[Role.HOTELADMIN, Role.HOTELRECEPTIONIST, Role.ADMIN]}
          />
        }
      >
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile*" element={<HotelProfilePage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/rewards/edit" element={<EditReward />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}></Route>
    </Routes>
  );
};
