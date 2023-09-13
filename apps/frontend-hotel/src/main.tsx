//import { AppRoutes } from '@routes';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ExamplePage from './features/example/pages/example-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ExamplePage />
  </StrictMode>
);
