import React, { lazy, Suspense } from 'react';
import FallbackLoading from 'modules/common/components/FallbackLoading/FallbackLoading';
import AdminLayout from 'layout/adminLayout/AdminLayout';
import AdminProtectedRoute from 'modules/common/components/AdminProtectedRoute';
import LoadingLayout from 'layout/loadingLayout/LoadingLayout';

const ManageProducts = lazy(() => import('modules/admin/pages/product/ManageProduct/ManageProductsPage'));
const ProductDetail = lazy(() => import('modules/admin/pages/product/ProductDetail/ProductDetailPage'));
const NewProductPage = lazy(() => import('modules/admin/pages/product/NewProduct/NewProductPage'));
const ManageUsers = lazy(() => import('modules/admin/pages/user/ManageUser/ManageUsersPage'));
const UserDetailPage = lazy(() => import('modules/admin/pages/user/UserDetail/UserDetailPage'));
const NewUser = lazy(() => import('modules/admin/pages/user/NewUser/NewUserPage'));
import Home from './home/Home';

interface Props {}

const AdminPage = (props: Props) => {
  return (
    <LoadingLayout>
      <AdminLayout>
        <Suspense fallback={<></>}>
          <AdminProtectedRoute exact path="/pages/">
            <Home />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/products/product-detail/:id">
            <ProductDetail />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/user/user-detail/:id">
            <UserDetailPage />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/products/new-product">
            <NewProductPage />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/products/manage-product">
            <ManageProducts />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/user/manage-user">
            <ManageUsers />
          </AdminProtectedRoute>
          <AdminProtectedRoute path="/pages/user/new-user">
            <NewUser />
          </AdminProtectedRoute>
        </Suspense>
      </AdminLayout>
    </LoadingLayout>
  );
};

export default AdminPage;
