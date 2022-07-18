import { IProductDetailDataField } from 'models/product';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { PRODUCT_METADESCTYPES_OPTIONS } from 'modules/product/constants';
import React, { memo } from 'react';
import ProductInputRow from '../ProductInputRow/ProductInputRow';

interface Props {
  value: string;
  onChange: (value: IProductDetailDataField) => void;
  meta_description: string;
}

const ProductMetaDescType = (props: Props) => {
  const handleChange = (value: string) => {
    props.onChange({ meta_description: value });
  };
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
            onChange={(value: string) => {
              props.onChange({
                meta_desc_type: value,
              });
            }}
            options={PRODUCT_METADESCTYPES_OPTIONS}
          />
        </div>
      </div>
      {props.value == 'C' ? (
        <ProductInputRow
          key_name="meta_description"
          text=""
          value={props?.meta_description}
          onChange={props.onChange}
        />
      ) : null}
    </>
  );
};

export default memo(ProductMetaDescType);
