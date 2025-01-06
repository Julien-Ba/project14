import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import App from './App';
import routes from './router/routes';

/**
 * @param {string} _url
 */

export function render(_url) {
    const router = createStaticRouter(routes, _url);
    const html = renderToString(
        <StrictMode>
            <StaticRouterProvider router={router}>
                <App />
            </StaticRouterProvider>
        </StrictMode>
    );
    return { html };
}
