import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { Icons } from '@libs/icons-web';

import { useAuthStore } from '@hotel/features/auth/store/auth';

import { Role } from '../../features/auth/types';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const SideNavigation = () => {
  const authUser = useAuthStore((state) => state.user);
  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: Icons.home },
    authUser?.role !== Role.ADMIN && {
      name: 'Hotel Profile',
      to: '/profile/general',
      icon: Icons.building,
    },
    authUser?.role !== Role.ADMIN && {
      name: 'Bookings',
      to: '/bookings',
      icon: Icons.calendar,
    },
    authUser?.role !== Role.ADMIN && {
      name: 'Rewards',
      to: '/rewards',
      icon: Icons.gift,
    },
    /*    authUser?.role !== Role.ADMIN && {
      name: 'Example',
      to: '/example',
      icon: Icons.folder,
    }, */
    authUser?.role !== Role.ADMIN && {
      name: 'Reports',
      to: '/reports',
      icon: Icons.fileBarChart,
    },
    authUser?.role === Role.ADMIN && {
      name: 'Properties',
      to: '/properties',
      icon: Icons.tableProperties,
    },
    authUser?.role === Role.ADMIN && {
      name: 'Manage Hotels',
      to: './admin/hotels',
      icon: Icons.building,
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={({ isActive }) => {
            return clsx(
              'hover:bg-gray-100/10 hover:text-white',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md ease-in transition-all',
              isActive
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800'
                : 'text-gray-100'
            );
          }}
        >
          <item.icon
            className={clsx('mr-4 flex-shrink-0 h-6 w-6')}
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

export default SideNavigation;
