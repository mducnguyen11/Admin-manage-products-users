import React, { memo, useEffect, useState } from 'react';
import InputWithUnit from '../InputWithUnit/InputWithUnit';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { FormattedMessage } from 'react-intl';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';

interface Props {
  continentalList: { id: string; zone_name: string; price: string }[];
  onChange: Function;
  errorMessage?: string;
}

const ProductShipping = (props: Props) => {
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

  const handleChangePrice = (a: { [key: string]: string }) => {
    console.log(a);
    const xx = Object.keys(a)[0];
    const ll = continentalList.map((b) => {
      if (xx == b.id) {
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
  const handleRemoveCountry = (a: string) => {
    props.onChange({
      shipping: continentalList.filter((b) => b.id !== a),
    });
  };
  return (
    <>
      {continentalList.map((a, i) => {
        return (
          <React.Fragment key={i}>
            <div className="product-detail-row product-detail-continental">
              <div className="product-detail-row-name">
                <p className="product-detail-row-name-value"> {a.zone_name} </p>
              </div>
              <div className="product-detail-row-input product-detail-continental-input">
                <InputWithUnit currentUnit="$" value={a.price} name={a.id} onChange={handleChangePrice} />
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
          <div className="product-detail-row-action">
            <p onClick={handleAddCountry} className="action">
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
