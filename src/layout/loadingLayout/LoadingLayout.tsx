import React from 'react';

import './loading-layout.scss';
import LoadingLayoutCircular from './components/LoadingLayoutCircular';
interface Props {
  children?: React.ReactNode;
}

const LoadingLayout = (props: Props) => {
  return (
    <>
      <LoadingLayoutCircular />
      <>{props.children}</>
    </>
  );
};

export default LoadingLayout;
