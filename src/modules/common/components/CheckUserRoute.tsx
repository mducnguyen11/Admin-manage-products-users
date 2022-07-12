import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
interface Props extends RouteProps {}
const ProtectedRoute = (props: Props) => {
  const { ...rest } = props;
  const auth = Cookies.get(ACCESS_TOKEN_KEY);
  if (auth) {
    return (
      <Redirect
        to={{
          pathname: '/pages/',
        }}
      />
    );
  }
  return <Route {...rest} />;
};

export default ProtectedRoute;
