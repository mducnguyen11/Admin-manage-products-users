import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import React, { memo } from 'react';
import InputKey from '../ProductInputRow/ProductInputRow';

interface Props {
  value: string;
  onChange: Function;
  meta_description: string;
}

const ProductMetaDescType = (props: Props) => {
  return (
    <>
      <div className=" product-detail-row product-detail-metatag">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p">Meta Description</p>
        </div>
        <div className=" product-detail-row-input product-detail-metatag-input">
          <SelectForm
            className="product-detail-row-input-value"
            value={props.value}
            onChange={(a: { meta_desc_type: string }) => {
              props.onChange(a);
            }}
            key_name="meta_desc_type"
            options={[
              {
                id: 'A',
                name: 'Autogenerate',
              },
              {
                id: 'C',
                name: 'Custom',
              },
            ]}
          />
        </div>
      </div>
      {props.value == 'C' ? (
        <InputKey key_name="meta_description" text="" value={props?.meta_description} onChange={props.onChange} />
      ) : null}
    </>
  );
};

export default memo(ProductMetaDescType);
