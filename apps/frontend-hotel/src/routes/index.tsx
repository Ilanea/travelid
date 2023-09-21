import { useRoutes } from 'react-router-dom';
import ExamplePage from '../features/example/pages/Example';
import HotelPage from "../features/HotelPage/pages/HotelPage";
import Bookings from "../features/HotelPage/pages/Bookings";
import Info from "../features/HotelPage/pages/Info";
import Report from "../features/HotelPage/pages/Report";

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
  {
    path: '/Info',
    element: <Info />,
  },
  {
    path: '/Report',
    element: <Report />,
  },
];

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <div>Test</div> }];

  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
