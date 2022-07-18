import { IProductDetailDataField } from 'models/product';
import React, { memo, useEffect, useState } from 'react';
import './ProductTaxClass.scss';

interface Props {
  value: string;
  onChange: (value: IProductDetailDataField) => void;
}

const ProductTaxClass = (props: Props) => {
  return (
    <div className="product-detail-row product-detail-tax-class ">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Tax Class</p>
      </div>
      <div className="product-detail-tax-class-input">
        <p> Default </p>
        <div className="tax-exempt">
          <input
            onChange={() => {
              if (props.value == '0') {
                props.onChange({
                  tax_exempt: '1',
                });
              } else {
                props.onChange({
                  tax_exempt: '0',
                });
              }
            }}
            checked={props.value == '1'}
            type="checkbox"
          />
          <p>Tax Exempt</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductTaxClass);
