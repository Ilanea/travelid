import { AppRoutes } from './routes';
import AppProvider from './providers/app-provider';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
