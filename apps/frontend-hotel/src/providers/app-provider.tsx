import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@hotel/features/auth/context/auth-provider';
import { Toaster } from '@libs/ui-web';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default AppProvider;
