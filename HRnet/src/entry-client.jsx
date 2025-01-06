import './index.css';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import routes from './router/routes';

const router = createBrowserRouter(routes);

hydrateRoot(
    document.getElementById('root'),
    <StrictMode>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </StrictMode>
);
