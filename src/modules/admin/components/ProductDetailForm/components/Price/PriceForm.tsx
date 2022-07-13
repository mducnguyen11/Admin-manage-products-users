import React, { useState } from 'react';
import InputWithUnit from '../InputWithType/InputWithUnit';

import './price-form.scss';
import InputForm from 'modules/admin/components/InputField/InputField';
import { FormattedMessage } from 'react-intl';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
interface Props {
  price: string;
  sale_price: string;
  sale_price_type: string;
  onChange: Function;
  errorMessage?: string;
}

const PriceForm = (props: Props) => {
  const [startSale, setStartSale] = useState(false);
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
              value={props.price}
              name="price"
              onChange={props.onChange}
            />
          </div>
          <div className="sale">
            <input
              onChange={() => {
                if (Number(props.sale_price) > 0) {
                  props.onChange({
                    sale_price: '0.0000',
                  });
                } else {
                  if (startSale) {
                    setStartSale(false);
                  } else {
                    setStartSale(true);
                  }
                }
              }}
              checked={Number(props.sale_price) > 0 || startSale}
              type="checkbox"
            />
            <p>Sale</p>
            {Number(props.sale_price) > 0 || startSale ? (
              <>
                <div className="select-unit">
                  <SelectForm
                    key_name="sale_price_type"
                    onChange={(a: { sale_price_type: string }) => {
                      props.onChange(a);
                    }}
                    value={props.sale_price_type}
                    options={[
                      {
                        id: '$',
                        name: '$',
                      },
                      {
                        id: '%',
                        name: '%',
                      },
                    ]}
                  />
                </div>
                <div className="sale-input-value">
                  <InputForm
                    onlyNumber
                    value={props.sale_price}
                    onChange={(a: { sale_price: string }) => {
                      setStartSale(true);
                      console.log(a);
                      props.onChange(a);
                    }}
                    key_name="sale_price"
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

export default PriceForm;
