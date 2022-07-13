import React from 'react';

interface Props {}

const Home = (props: Props) => {
  return (
    <>
      <input
        type={'text'}
        onKeyPress={(e) => {
          if (!e.code.includes('Digit')) {
            e.preventDefault();
          } else {
            return e;
          }
        }}
      />
    </>
  );
};

export default Home;
