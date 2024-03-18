import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';

export const ClientPage = lazy(() => import('../pages/client'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
          </DashboardLayout>
      ),
      children: [
        { path: 'cliente', element: <ClientPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '/',
      element: <Navigate to="/cliente" replace />,
    },   
     {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
