import React from 'react';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
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
