import React, { memo, useEffect, useState } from 'react';
import InputWithUnit from '../InputWithType/InputWithUnit';
import '../Price/price-form.scss';

import { API_PATHS } from 'configs/api';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
import './continental.scss';
import { FormattedMessage } from 'react-intl';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';

interface Props {
  continentalList: { id: string; zone_name: string; price: string }[];
  onChange: Function;
  errorMessage?: string;
}
interface Country {
  active_currency: any;
  code: string;
  code3: string;
  country: string;
  currency_id: string;
  enabled: string;
  id: string;
  is_fraudlent: string;
}

const Continental = (props: Props) => {
  const [continentalList, setContinentalList] = useState<{ id: string; zone_name: string; price: string }[]>(
    props.continentalList,
  );
  const listCountry = useSelector((state: AppState) => state.country.country);

  const [countrySelect, setCountrySelect] = useState<string>('0');

  useEffect(() => {
    setContinentalList(props.continentalList);
  }, [props.continentalList]);
  const handleAddCountry = () => {
    if (countrySelect !== '0') {
      const ax: { id: string; zone_name: string; price: string }[] = [];
      listCountry.forEach((a) => {
        if (a.id == countrySelect) {
          ax.push({
            id: a.id,
            zone_name: a.country,
            price: '0.0000',
          });
        }
      });

      if (ax.length > 0) {
        setContinentalList([...continentalList, ax[0]]);
        props.onChange({
          shipping: [...continentalList, ax[0]],
        });
        setCountrySelect('0');
      }
    }
  };

  const handleChange = (a: { [key: string]: string }) => {
    const xx = Object.keys(a)[0];
    const ll = continentalList.map((b) => {
      if (xx == b.id) {
        console.log(b);
        return {
          ...b,
          price: a[xx],
        };
      } else {
        return b;
      }
    });
    setContinentalList(ll);
    props.onChange({
      shipping: ll,
    });
  };
  const filterCountry = (): { id: string; name: string }[] => {
    const xx: { id: string; name: string }[] = [];
    listCountry.map((a) => {
      if (continentalList.findIndex((b) => b.id == a.id) == -1) {
        xx.push({
          id: a.id,
          name: a.country,
        });
      }
    });
    return xx;
  };
  return (
    <>
      {continentalList.map((a, i) => {
        return (
          <React.Fragment key={i}>
            <div className="product-detail-row product-detail-continental">
              <div className="product-detail-row-name">
                <p className="product-detail-row-name-p"> {a.zone_name} </p>
              </div>
              <div className="product-detail-row-input product-detail-continental-input">
                <div className="continental-input ">
                  <InputWithUnit
                    error={a.price == '0' || a.price == '' || a.price == '0.00' ? props.errorMessage : ''}
                    currentUnit="$"
                    value={a.price}
                    name={a.id}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div className="product-detail-row product-detail-continental">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p"></p>
        </div>
        <div className=" product-detail-newcountry-input">
          <div className="select-form-new-country">
            <SelectForm
              key_name="country_id"
              onChange={(a: { country_id: string }) => {
                console.log('change xxx : ', a);
                setCountrySelect(a.country_id);
              }}
              value={countrySelect}
              options={[
                {
                  id: '0',
                  name: 'Select new country',
                },
                ...filterCountry(),
              ]}
            />
          </div>
          <div className="select-form-new-country">
            <p onClick={handleAddCountry} className="add-action">
              Add new{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="error-row"></div>
    </>
  );
};

export default memo(Continental);
