// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import SignIn from './routes/SignInPage.jsx';
import MainPage from './routes/MainPage.jsx';
import CategoriesPage from './routes/CategoriesPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SuppliersPage from './routes/SuppliersPage.jsx';
import ProductsPage from './routes/ProductsPage.jsx';
import ReqPage from './routes/ReqPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'init',
        element: <PrivateRoute element={<MainPage />} />,
      },
      {
        path:'register',
        element: <PrivateRoute element={<CategoriesPage />} />,
      },
      {
        path: 'register/categories',
        element: <PrivateRoute element={<CategoriesPage />} />,
      },
      {
        path: 'register/suppliers',
        element: <PrivateRoute element={<SuppliersPage />} />,
      },
      {
        path: 'register/products',
        element: <PrivateRoute element={<ProductsPage />} />,
      },
      {
        path: 'register/requests',
        element: <PrivateRoute element={<ReqPage />} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
