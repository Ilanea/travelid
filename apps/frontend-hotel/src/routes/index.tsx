import { useRoutes } from 'react-router-dom';
import ExamplePage from '../features/example/pages/example-page';

const publicRoutes = [
  {
    path: '/example',
    element: <ExamplePage />,
  },
];

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <div>Landing Page</div> }];

  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
