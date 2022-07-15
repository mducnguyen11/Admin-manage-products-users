import { API_PATHS } from 'configs/api';
import SearchSuggetForm from 'modules/common/components/SelectAutoDebounce/SelectAutoDebounce';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'redux/reducer';
interface Props {
  value: string;
  onChange: Function;
  errorMessage?: string;
}

const ProductVendor = (props: Props) => {
  const vendorList = useSelector((state: AppState) => state.vendors.vendors);
  return (
    <div className="product-detail-row">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Vendor</p>
      </div>
      <div className="product-detail-row-input product-detail-vendor-input">
        <div className="product-detail-row-input-container">
          <SearchSuggetForm
            key_name="vendor_id"
            options={vendorList}
            error={props.errorMessage}
            value={props.value}
            changeData={props.onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductVendor);
