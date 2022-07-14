import React, { memo, useEffect, useState } from 'react';
import Switch from 'modules/admin/components/Switch/Switch';
import './ProductInputSwitch.scss';

interface Props {
  key_name: string;
  onChange: Function;
  value: string;
  text: string;
  helperIcon?: boolean;
}

const ProductInputSwitch = (props: Props) => {
  const handleChange = (a: { [key: string]: string }) => {
    props.onChange(a);
  };
  return (
    <div className="product-detail-row">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">{props.text}</p>
      </div>
      <div
        className={
          'product-detail-row-input product-detail-row-switch-input  ' +
          ' product-detail-' +
          props.key_name.replace('_', '-') +
          '-input'
        }
      >
        {' '}
        <Switch onChange={handleChange} value={Number(props.value)} name={props.key_name} />
        {props.helperIcon ? <i className="bx bx-help-circle"></i> : null}
      </div>
    </div>
  );
};

export default memo(ProductInputSwitch);
