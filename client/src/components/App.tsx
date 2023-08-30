import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { PageLoader } from './PageLoader';
import { Layout } from './Layout';
import { AuthProvider } from '../hoc/AuthProvider';
import { useNotify } from '../hooks/useNotify';
import { Notification } from './Notification';
import { RequireAuth } from '../hoc/RequireAuth';

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const Clients = lazy(() => import('../pages/Clients'));
const Managers = lazy(() => import('../pages/Managers'));
const Tours = lazy(() => import('../pages/Tours'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Report = lazy(() => import('../pages/Report'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const TourDetails = lazy(() => import('../pages/TourDetails'));

const App: React.FC = () => {
  const { notify, setNotify } = useNotify();

  return (
    <AuthProvider>
      <Routes>
        <Route path={ROUTES.Register} element={
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        } />
        <Route path={ROUTES.Login} element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        } />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Clients />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={ROUTES.Clients} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Clients />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={ROUTES.Managers} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Managers />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={ROUTES.Tours} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Tours />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={ROUTES.TourNew} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <TourDetails />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={`${ROUTES.TourDetails}:paramsId`} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <TourDetails />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={`${ROUTES.Schedule}:modeParam/`} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Schedule />
              </Suspense>
            </RequireAuth>
          } />
          <Route path={ROUTES.Report} element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <Report />
              </Suspense>
            </RequireAuth>
          } />
          <Route path="*" element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            </RequireAuth>
          } />
        </Route>
      </Routes>
      {
        notify.isActive ?
          <Notification
            type={notify.type}
            message={notify.message}
            afterHide={() => setNotify({ isActive: false, message: '', type: '' })}
          /> : null
      }
    </AuthProvider>
  )
};

export { App };
