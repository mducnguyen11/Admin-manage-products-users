import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import CheckUserRoute from './modules/common/components/CheckUserRoute';
import FallbackLoading from 'modules/common/components/FallbackLoading/FallbackLoading';
const AdminRoutes = lazy(() => import('./modules/admin/pages/AdminRoutes/AdminRoutes'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage/LoginPage'));
interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Switch location={location}>
        <CheckUserRoute path={ROUTES.login} component={LoginPage} />
        <AdminRoutes />
      </Switch>
    </Suspense>
  );
};
