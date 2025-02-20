import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './routes/Login.jsx';
import MainPage from './routes/MainPage.jsx';
import CategoriesPage from './routes/CategoriesPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'init',
        element: <MainPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
