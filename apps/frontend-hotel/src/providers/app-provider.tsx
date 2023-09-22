import { BrowserRouter } from 'react-router-dom';

import { Toaster } from '@libs/ui-web';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Toaster />
      <BrowserRouter>{children}</BrowserRouter>
    </>
  );
};

export default AppProvider;
