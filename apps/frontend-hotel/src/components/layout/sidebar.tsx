import { Link } from 'react-router-dom';

import Logo from '../logo';
import SideNavigation from './sidenavigation';

const LogoComponent = () => {
  return (
    <Link className="flex items-center text-white" to=".">
      <Logo />
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div className="flex items-center h-16 flex-shrink-0 px-6 bg-primary-950">
            <LogoComponent />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 bg-primary-950 space-y-2">
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
