import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import InputWithUnit from '../InputWithUnit/InputWithUnit';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { FormattedMessage } from 'react-intl';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { IProductDetailDataField } from 'models/product';

interface Props {
  shippings: { id: string; zone_name: string; price: string }[];
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
}

const ProductShipping = (props: Props) => {
  const allshippingsList = useSelector((state: AppState) => state.shippings.shippings);
  const [shippingZoneSelected, setShippingZoneSelected] = useState<string>('');
  const handleAddShipping = () => {
    if (shippingZoneSelected) {
      const newShippingZone: { id: string; zone_name: string; price: string }[] = [];
      allshippingsList.forEach((a) => {
        if (a.id == shippingZoneSelected) {
          return newShippingZone.push({
            id: a.id,
            zone_name: a.name,
            price: '0.00',
          });
        }
      });
      if (newShippingZone.length > 0) {
        props.onChange({
          shipping: [...props.shippings, newShippingZone[0]],
        });
        setShippingZoneSelected('');
      }
    }
  };
  const handleChangePrice = (shipping: { [key: string]: string }) => {
    const id = Object.keys(shipping)[0];
    const newContinentalList = props.shippings.map((b) => {
      if (id == b.id) {
        return {
          ...b,
          price: shipping[id],
        };
      } else {
        return b;
      }
    });
    props.onChange({
      shipping: newContinentalList,
    });
  };
  const getshippingsList = useCallback((): { value: string; name: string }[] => {
    const listShippingsToSelect: { value: string; name: string }[] = [];
    allshippingsList.map((a) => {
      if (props.shippings.findIndex((b) => b.id == a.id) == -1) {
        listShippingsToSelect.push({
          value: a.id || '',
          name: a.name,
        });
      }
    });
    return listShippingsToSelect;
  }, [props.shippings, allshippingsList]);

  const getshippingsListOtions = useMemo(() => {
    return getshippingsList();
  }, [getshippingsList]);
  const handleRemoveCountry = (value: string) => {
    props.onChange({
      shipping: props.shippings.filter((b) => b.id !== value),
    });
  };

  return (
    <>
      {props.shippings.map((a, i) => {
        return (
          <React.Fragment key={i}>
            <div className="product-detail-row product-detail-continental">
              <div className="product-detail-row-name">
                <p className="product-detail-row-name-value"> {a.zone_name} </p>
              </div>
              <div className="product-detail-row-input product-detail-continental-input">
                <InputWithUnit
                  currentUnit="$"
                  value={a.price}
                  key_name={a.id}
                  onChange={(value: string) => {
                    handleChangePrice({ [a.id]: value });
                  }}
                />
                {a.id !== '1' ? (
                  <div className="product-detail-row-action">
                    <p
                      onClick={() => {
                        handleRemoveCountry(a.id);
                      }}
                      className="action"
                    >
                      Remove
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div className="product-detail-row product-detail-continental">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p"></p>
        </div>
        <div className="product-detail-row-input product-detail-continental-input">
          <div className="product-detail-row-input-container">
            <SelectForm
              onChange={(a: string) => {
                setShippingZoneSelected(a);
              }}
              value={shippingZoneSelected}
              options={getshippingsListOtions}
            />
          </div>
          <div className="product-detail-row-action">
            <p onClick={handleAddShipping} className="action">
              Add new{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="error-message-row">
        {props.errorMessage ? (
          <span className="error-message"> {<FormattedMessage id={props.errorMessage} />}</span>
        ) : null}
      </div>
    </>
  );
};

export default memo(ProductShipping);
