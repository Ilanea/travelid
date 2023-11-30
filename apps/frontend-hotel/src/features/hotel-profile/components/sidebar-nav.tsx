//import Link from "next/link"
import { is } from 'date-fns/locale';
import { Link, NavLink } from 'react-router-dom';

import { buttonVariants } from '@libs/ui-web';
import { cn } from '@libs/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => {
            return cn(
              buttonVariants({ variant: 'ghost' }),
              isActive
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            );
          }}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}
