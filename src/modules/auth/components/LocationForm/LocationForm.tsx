import React from 'react';
import { useState, useEffect } from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

interface option {
  id: string;
  name: string;
}

interface Props {
  errorMessage?: {
    locationCountry: string;
    locationCity: string;
  };
  values?: {
    locationCountry: string;
    locationCity: string;
  };
  onChange?: Function;
}

const locationForm = (props: Props) => {
  const { errorMessage } = props;
  const [locationCountryList, setLocationCountryList] = useState<option[]>([]);
  const [cityList, setCityList] = useState<option[]>([]);
  const [errorSelectCity, setErrorSelectCity] = useState(false);
  console.log(props.values);
  const getCityList = (id: string) => {
    if (id) {
      axios
        .get('http://api.training.div3.pgtest.co/api/v1/location?pid=' + id)
        .then((a) => {
          {
            console.log(a.data.data);
            setCityList(a.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCityList([]);
    }
  };

  useEffect(() => {
    const getLocationList = async () => {
      axios
        .get('http://api.training.div3.pgtest.co/api/v1/location')
        .then((a) => {
          {
            console.log(a.data.data);
            setLocationCountryList(a.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getLocationList();
  }, []);
  return (
    <>
      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="locationCountry" />
        </label>
        <Field
          onChange={(e: any) => {
            setErrorSelectCity(false);
            if (props.onChange) {
              getCityList(e.target.value);
              props.onChange(e);
            }
          }}
          as="select"
          className="form-control locationCountry"
          id="locationCountry"
          name="locationCountry"
        >
          <option value=""> -- Select an option --</option>
          {locationCountryList.map((a) => {
            return (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            );
          })}
        </Field>
        <small className="text-danger">
          {errorMessage?.locationCountry ? <FormattedMessage id={errorMessage.locationCountry} /> : null}
        </small>
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="locationCity" />
        </label>
        <Field
          onChange={(e: any) => {
            if (props.onChange) {
              console.log(e.target.value);
              props.onChange(e);
            }
          }}
          onFocus={() => {
            if (props.values?.locationCountry == '') {
              setErrorSelectCity(true);
            } else {
              setErrorSelectCity(false);
            }
          }}
          as="select"
          className=" form-control locationCity"
          id="locationCity"
          name="locationCity"
        >
          <option value=""> -- Select an option --</option>
          {cityList.map((a) => {
            return (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            );
          })}
        </Field>
        <small className="text-danger">
          {errorSelectCity ? (
            <FormattedMessage id="setLocationCountryFirst" />
          ) : errorMessage?.locationCity ? (
            <FormattedMessage id={errorMessage.locationCity} />
          ) : null}

          {/* {validateError.email !== '' ? <FormattedMessage id={validateError.email} /> : null} */}
          {/* <ErrorMessage name="email"/> */}
        </small>
      </div>
    </>
  );
};

export default locationForm;
