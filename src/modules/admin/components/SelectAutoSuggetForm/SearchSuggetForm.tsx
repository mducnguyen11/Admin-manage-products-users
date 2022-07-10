import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import './vendor.scss';
interface Props {
  value: string;
  changeData: Function;
  errorMessage?: string;
  options: {
    id: string | number;
    name: string;
    [key: string]: any;
  }[];
  name: string;
}

const SelectAutoSuggetForm = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listValueSugget, setlistValueSugget] = useState<
    {
      id: string | number;
      [key: string]: any;
      name: string;
    }[]
  >([]);
  const [valueName, setValueName] = useState<string>('');
  const findNameByValue = useCallback(
    (value: string, options: { id: string | number; name: string; [key: string]: any }[]): string => {
      if (value !== '') {
        const i = options.findIndex((a) => {
          if (a.id.toString() == value) {
            return a;
          }
        });
        if (i >= 0) {
          return options[i].name;
        } else {
          return '';
        }
      } else {
        return valueName;
      }
    },
    [],
  );
  useEffect(() => {
    console.log('props.value :', props.value);
    setValueName(findNameByValue(props.value, props.options));
  }, [props.value, props.options]);
  const handleSuggetValue = (e: string) => {
    if (e.length >= 2) {
      const xx = props.options.filter((a, i) => {
        if (a.name.includes(e)) {
          return a;
        }
      });
      setlistValueSugget(xx);
    } else {
      setlistValueSugget([]);
    }
  };

  return (
    <>
      <div className="select-form">
        <div className="select-form-value select-vendor-value">
          <input
            onChange={(e) => {
              setValueName(e.target.value);

              setOpen(true);
              handleSuggetValue(e.target.value);
            }}
            value={valueName}
            className="select-form-input search-sugget"
            type="text"
          />
          <i
            onClick={() => {
              setOpen(!open);
            }}
            className={open ? 'bx bx-chevron-down list-open' : 'bx bx-chevron-down'}
          ></i>
        </div>
        {open ? (
          <div className="select-form-list">
            <>
              {props.options.length > 0 || props.value !== '' ? (
                <>
                  {listValueSugget.map((a, i) => {
                    return (
                      <div
                        onClick={() => {
                          setOpen(false);
                          console.log('idd : ', a.id);
                          if (props.value !== a.id) {
                            const ob: { [key: string]: any } = {};
                            ob[props.name] = a.id;
                            props.changeData(ob);
                          }
                        }}
                        key={i}
                        className="select-form-item"
                      >
                        <p className="select-form-item-value">{a.name}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="select-form-item">{props.value == '' ? null : <p>No option</p>}</div>
              )}
            </>
          </div>
        ) : null}
      </div>
      {props.errorMessage && valueName == '' ? (
        <span className="error-message">
          {' '}
          <FormattedMessage id={props.errorMessage} />{' '}
        </span>
      ) : null}
    </>
  );
};

export default SelectAutoSuggetForm;
