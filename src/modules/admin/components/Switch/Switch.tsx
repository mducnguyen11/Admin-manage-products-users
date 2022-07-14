import React, { useState } from 'react';
import './switch.scss';
interface Props {
  value: number;
  name: string;
  onChange: Function;
}

const Switch = (props: Props) => {
  const handleChange = () => {
    const obj: { [key: string]: string } = {};
    if (props.value == 1) {
      obj[props.name] = '0';
    } else {
      obj[props.name] = '1';
    }
    props.onChange(obj);
  };
  return (
    <div className={props.value ? 'switch' : 'switch switch-no'}>
      <div onClick={handleChange} className="switch-yes-value">
        {' '}
        <p>Yes</p>
        <div className="switch-yes-value-block"></div>
      </div>
      <div onClick={handleChange} className="switch-no-value-wrapper">
        <div className={props.value == 1 ? 'switch-no-value' : 'switch-no-value switch-transform'}>
          {' '}
          <div className="switch-no-value-block"></div> <p>No</p>
        </div>
      </div>
    </div>
  );
};

export default Switch;
