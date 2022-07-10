import React, { useEffect, useState } from 'react';

interface Props {
  value: boolean;
  onChange: Function;
}

const Checkbox = (props: Props) => {
  return (
    <input
      checked={props.value}
      onChange={() => {
        props.onChange(!props.value);
      }}
      type={'checkbox'}
    />
  );
};

export default Checkbox;
