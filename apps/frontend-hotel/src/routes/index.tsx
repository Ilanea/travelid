import { useRoutes } from 'react-router-dom';
import ExamplePage from '../features/example/pages/Example';
import ExamplePage2 from '../features/example/pages/Example2';

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
