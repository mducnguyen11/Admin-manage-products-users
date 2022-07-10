import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

interface Props {}

const ErrorPage = (props: Props) => {
  const history = useHistory();
  useEffect(() => {
    history.block();
  }, []);

  return <h2>Error </h2>;
};

export default ErrorPage;
