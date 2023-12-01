import { Link, useLocation } from 'react-router-dom';
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';

import { Icons } from '@libs/icons-web';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@libs/ui-web';

import { signOut } from '@hotel/features/auth/api/sign-out';
import { useAuthStore } from '@hotel/features/auth/store/auth';

type InjectedProps = {
  breadCrumbs: Array<BreadcrumbData>;
};

const BreadcrumbTrail = ({ breadCrumbs }: InjectedProps) => {
  return (
    <Breadcrumb>
      {breadCrumbs.map(
        ({ match, breadcrumb }: BreadcrumbData, i: number, row) => {
          const isLast = i === row.length - 1;
          return (
            <BreadcrumbItem isCurrentPage={isLast} key={match.pathname}>
              <BreadcrumbLink to={match.pathname}>{breadcrumb}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        }
      )}
    </Breadcrumb>
  );
};

const pathToTile = (str: string) => {
  str = str.split('/')[str.split('/').length - 1];
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

//TODO - replace with user avatar
const avatarPath =
  'https://styles.redditmedia.com/t5_2qhk5/styles/communityIcon_v58lvj23zo551.jpg?format=pjpg&s=1ff68e27037151461267326f90b701705fb5a527';

function Topbar() {
  const breadcrumbs = useBreadcrumbs();
  const location = useLocation();
  const authUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logoutUser);

  const pathname = pathToTile(location.pathname);

  const email = authUser?.email;
  const name = authUser?.firstName + ' ' + authUser?.lastName;
  let initials;
  if (authUser?.firstName && authUser?.lastName) {
    initials = authUser.firstName.charAt(0) + authUser.lastName.charAt(0);
  }

  const logoutHandler = () => {
    signOut();
    logout();
  };

  return (
    <div className="px-6 flex flex-1 justify-between items-center ">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-slate-800">
          {pathname ? pathname : 'Home'}
        </h1>
        <BreadcrumbTrail breadCrumbs={breadcrumbs} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:ring-4 ring-gray-300 ease-in transition-all duration-75 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage />
            <AvatarFallback>
              {initials ? initials : <Icons.user />}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel className="text-slate-600 pb-0 font-light">
            {name}
          </DropdownMenuLabel>
          <DropdownMenuLabel>{email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {' '}
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <Link to="/auth/signin" onClick={logoutHandler}>
              Logout
            </Link>
            <Icons.logOut className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Topbar;
