import React, { memo, useState } from 'react';
import InputWithUnit from '../InputWithUnit/InputWithUnit';

import './ProductPrice.scss';
import InputField from 'modules/common/components/InputField/InputField';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { PRODUCT_SALE_PRICE_TYPE_OPTIONS } from 'modules/product/constants';
import { IProductDetailDataField } from 'models/product';
interface Props {
  price: string;
  sale_price: string;
  sale_price_type: string;
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
  participate_sale: string;
}

const ProductPrice = (props: Props) => {
  return (
    <>
      <div className="product-detail-row product-detail-price-form ">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p">Price</p>
        </div>
        <div className="product-detail-price-input">
          <div className="price">
            <InputWithUnit
              error={props.errorMessage}
              currentUnit="$"
              value={props.price || '0.00'}
              key_name="price"
              onChange={(value: string) => {
                props.onChange({ price: value });
              }}
            />
          </div>
          <div className="sale">
            <input
              onChange={() => {
                if (props.participate_sale == '1') {
                  props.onChange({
                    participate_sale: '0',
                  });
                } else {
                  props.onChange({
                    participate_sale: '1',
                  });
                }
              }}
              checked={props.participate_sale == '1'}
              type="checkbox"
            />
            <p>Sale</p>
            {props.participate_sale == '1' ? (
              <>
                <div className="select-unit">
                  <SelectForm
                    onChange={(value: string) => {
                      props.onChange({
                        sale_price_type: value,
                      });
                    }}
                    value={props.sale_price_type}
                    options={PRODUCT_SALE_PRICE_TYPE_OPTIONS}
                  />
                </div>
                <div className="sale-input-value">
                  <InputField
                    type="number"
                    value={props.sale_price}
                    onChange={(value: string) => {
                      props.onChange({
                        sale_price: value,
                      });
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductPrice);
