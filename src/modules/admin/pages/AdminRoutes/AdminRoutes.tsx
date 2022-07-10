import React, { Suspense } from 'react';
import AdminLayout from 'layout/adminLayout/AdminLayout';
import AdminProtectedRoute from 'modules/common/components/AdminProtectedRoute';
import ManageProducts from 'modules/admin/pages/ManageProduct/ManageProducts';
import ProductDetail from 'modules/admin/pages/ProductDetail/ProductDetailPage';
import NewProductPage from '../NewProduct/NewProductPage';
import ManageUsers from '../ManageUser/ManageUsers';
import UserDetailPage from '../UserDetail/UserDetailPage';
import NewUser from '../NewUser/NewUser';
import LoadingLayout from 'layout/loadingLayout/LoadingLayout';
import FallbackLoading from 'modules/common/components/FallbackLoading/FallbackLoading';

interface Props {}

const AdminPage = (props: Props) => {
  return (
    <LoadingLayout>
      <AdminLayout>
        <Suspense fallback={<FallbackLoading />}>
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
