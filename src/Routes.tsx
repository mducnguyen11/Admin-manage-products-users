import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import Testvl from 'Testvl';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const SecondLoginPage = lazy(() => import('./modules/auth/pages/SecondLoginPage/SecondLoginPage'));
const RegisterPage = lazy(() => import('./modules/auth/pages/RegisterPage/RegisterPage'));
const PhotoPage = lazy(() => import('./modules/photo/pages/PhotoPage/PhotoPage'));
const TransactionsPage = lazy(
  () => import('./modules/manageTransactions/pages/magageTransactionsPage/TransactionsPage'),
);
interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        {/* <Route path={ROUTES.login} component={SecondLoginPage} /> */}
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path="/login" component={SecondLoginPage} />

        <Route exact path="/test" component={Testvl} />
        <Route path="/" component={TransactionsPage} />
      </Switch>
    </Suspense>
  );
};
