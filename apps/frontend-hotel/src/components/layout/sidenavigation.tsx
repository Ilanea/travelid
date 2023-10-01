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
    { name: 'Example', to: '/example', icon: Icons.folder },
    { name: 'Reports', to: '/report', icon: Icons.fileBarChart },
    authUser?.role === Role.ADMIN && {
      name: 'Users',
      to: './users',
      icon: Icons.users,
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
