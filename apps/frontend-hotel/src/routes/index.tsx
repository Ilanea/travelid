import { useRoutes } from 'react-router-dom';
import ExamplePage from '../features/example/pages/Example';
import HotelPage from "../features/HotelPage/pages/HotelPage";
import Bookings from "../features/HotelPage/pages/Bookings";

const publicRoutes = [
  {
    path: '/example',
    element: <ExamplePage />,
  },
  {
    path: '/HotelPage',
    element: <HotelPage />,
  },
  {
    path: '/Bookings',
    element: <Bookings />,
  },
];

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <div>Test</div> }];

  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
