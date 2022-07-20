import { IProductDetailDataField } from 'models/product';
import SelectAutoSuggetForm from 'modules/common/components/SelectAutoDebounce/SelectAutoDebounce';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';

interface Props {
  value: string | number;
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
}

const ProductVendor = (props: Props) => {
  const vendorList = useSelector((state: AppState) => state.vendors.vendors);
  console.log(vendorList);
  return (
    <div className="product-detail-row">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Vendor</p>
      </div>
      <div className="product-detail-row-input product-detail-vendor-input">
        <div className="product-detail-row-input-container">
          <SelectAutoSuggetForm
            options={[
              ...vendorList.map((a) => {
                return {
                  value: a.id,
                  name: a.name,
                };
              }),
            ]}
            error={props.errorMessage}
            value={props.value}
            changeData={(value: string | number) => {
              props.onChange({
                vendor_id: value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVendor);
