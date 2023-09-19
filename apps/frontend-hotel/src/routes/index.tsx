import { useRoutes } from 'react-router-dom';
import ExamplePage from '../features/example/pages/Example';
import SignUp from '../features/auth/pages/signup';
import Terms from '../features/misc/pages/terms';
import Privacy from '../features/misc/pages/privacy';
import NotFound from '../features/misc/pages/not-found';
import SignIn from '../features/auth/pages/signin';

const publicRoutes = [
  {
    path: '/example',
    element: <ExamplePage />,
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <div>Landing Page</div> }];

  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
