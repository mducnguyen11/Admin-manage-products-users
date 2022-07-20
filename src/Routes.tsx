import React, { lazy, Suspense } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import CheckUserRoute from './modules/common/components/CheckUserRoute';
import FallbackLoading from 'modules/common/components/FallbackLoading/FallbackLoading';
import ProtectedRoute from 'modules/common/components/ProtectedRoute';
import LoadingLayout from 'layout/loadingLayout/LoadingLayout';
import AdminLayout from 'layout/adminLayout/AdminLayout';
import Test from './Test';
import AdminProvider from 'modules/common/components/AdminProvider';
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage/LoginPage'));
const ManageProducts = lazy(() => import('modules/product/pages/ManageProduct/ManageProductsPage'));
const ProductDetail = lazy(() => import('modules/product/pages/ProductDetail/ProductDetailPage'));
const NewProductPage = lazy(() => import('modules/product/pages/NewProduct/NewProductPage'));
const ManageUsers = lazy(() => import('modules/user/pages/ManageUser/ManageUsersPage'));
const UserDetailPage = lazy(() => import('modules/user/pages/UserDetail/UserDetailPage'));
const NewUser = lazy(() => import('modules/user/pages/NewUser/NewUserPage'));
interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Switch location={location}>
        <CheckUserRoute path={ROUTES.login} component={LoginPage} />
        <LoadingLayout>
          <AdminProvider>
            <AdminLayout>
              <Suspense fallback={<></>}>
                <ProtectedRoute exact path="/test" component={Test} />
                <ProtectedRoute exact path="/pages/products/product-detail/:id" component={ProductDetail} />
                <ProtectedRoute exact path="/pages/products/new-product" component={NewProductPage} />
                <ProtectedRoute exact path="/pages/products/manage-product" component={ManageProducts} />
                <ProtectedRoute exact path="/pages/user/user-detail/:id" component={UserDetailPage} />
                <ProtectedRoute exact path="/pages/user/manage-user" component={ManageUsers} />
                <ProtectedRoute exact path="/pages/user/new-user" component={NewUser} />
              </Suspense>
            </AdminLayout>
          </AdminProvider>
        </LoadingLayout>
      </Switch>
    </Suspense>
  );
};
