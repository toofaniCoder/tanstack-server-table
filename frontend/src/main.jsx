import ReactDOM from 'react-dom/client';

// importing fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './routes/layout';
import Users from './routes/users';
import { CssBaseline, GlobalStyles } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <GlobalStyles styles={{ body: { backgroundColor: '#eee' } }} />
    <RouterProvider router={router} />
  </>
);
