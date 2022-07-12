import React from 'react';

import './loading-layout.scss';
import Circular from './components/Circular';
interface Props {
  children?: React.ReactNode;
}

const LoadingLayout = (props: Props) => {
  return (
    <>
      <Circular />
      <>{props.children}</>
    </>
  );
};

export default LoadingLayout;
