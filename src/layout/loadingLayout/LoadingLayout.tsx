import React from 'react';
import './LoadingLayout.scss';
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
