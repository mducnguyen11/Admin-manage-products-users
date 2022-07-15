import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import React from 'react';
import InputKey from '../ProductInputRow/ProductInputRow';

interface Props {
  value: string;
  onChange: Function;
  og_tags: string;
}

const MetaTag = (props: Props) => {
  return (
    <>
      <div className=" product-detail-row product-detail-metatag">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p">Open Graph meta tags</p>
        </div>
        <div className=" product-detail-row-input product-detail-metatag-input">
          <SelectForm
            className="product-detail-row-input-value"
            value={props.value}
            onChange={(a: { og_tags_type: string }) => {
              props.onChange(a);
            }}
            key_name="og_tags_type"
            options={[
              {
                id: '0',
                name: 'Autogenerate',
              },
              {
                id: '1',
                name: 'Custom',
              },
            ]}
          />
        </div>
      </div>

      {props.value == '1' ? (
        <InputKey key_name="og_tags" text="" value={props.og_tags} onChange={props.onChange} />
      ) : null}
    </>
  );
};

export default MetaTag;
