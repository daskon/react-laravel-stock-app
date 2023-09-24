import {Navigate, createBrowserRouter} from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import {AppLayout } from './components/AppLayout';
import {MainLayout } from './components/MainLayout';
import {Dashboard } from './pages/Dashboard';
import {Product } from './pages/Product';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/products',
                element: <Product/>
            },
            {
                path: '/products/update'
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default router;