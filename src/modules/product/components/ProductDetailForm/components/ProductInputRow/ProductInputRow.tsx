import { IProductDetailDataField } from 'models/product';
import InputField from 'modules/common/components/InputField/InputField';
import React, { memo } from 'react';

interface Props {
  value: string;
  onChange: (value: IProductDetailDataField) => void;
  key_name: string;
  text: string;
  errorMessage?: string;
  onlyNumber?: boolean;
}

const ProductInputRow = (props: Props) => {
  return (
    <div className={' product-detail-row ' + 'product-detail-' + props.key_name.replace('_', '-')}>
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">{props.text}</p>
      </div>
      <div className={'product-detail-row-input' + ' product-detail-' + props.key_name.replace('_', '-') + '-input'}>
        <InputField
          onlyNumber={props.onlyNumber || false}
          className="product-detail-row-input-value"
          value={props.value}
          onChange={(value: string) => {
            props.onChange({ [props.key_name]: value });
          }}
          error={props.errorMessage}
        />
      </div>
    </div>
  );
};

export default memo(ProductInputRow);
