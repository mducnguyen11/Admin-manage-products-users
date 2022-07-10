import React from 'react';

interface Props {
  index: number;
  value: number;
  children: React.ReactNode;
}

const Tab = (props: Props) => {
  return (
    <>
      {props.index === props.value ? (
        <>
          <div>{props.children}</div>
        </>
      ) : null}
    </>
  );
};

export default Tab;
