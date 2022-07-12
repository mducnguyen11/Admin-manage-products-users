import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  value: string;
  onChange: Function;
  onSearch: Function;
  errorMessage?: string;
  name: string;
  options: { id: string; name: string; [key: string]: any }[];
}

const SelectAPISuggetForm = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [valueName, setValueName] = useState<string>('');
  return (
    <>
      <div className="admin-select-form">
        <div className="admin-select-form-value select-vendor-value">
          <input
            onChange={(e) => {
              setValueName(e.target.value);
              setOpen(true);
              const ob: { [key: string]: any } = {};
              ob[props.name] = e.target.value;
              props.onChange(ob);
            }}
            value={valueName}
            className="admin-select-form-input search-sugget"
            type="text"
          />
          {open ? (
            <>
              <i
                onClick={() => {
                  setOpen(!open);
                }}
                className="bx bx-chevron-down list-open"
              ></i>
            </>
          ) : null}
        </div>
        {open ? (
          <div className="admin-select-form-list">
            <>
              {props.options.length > 0 ? (
                <>
                  {props.options.map((a, i) => {
                    return (
                      <div
                        onClick={() => {
                          setOpen(false);
                          console.log('idd : ', a.id);
                          setValueName(a.name);
                          if (props.value !== a.id) {
                            const ob: { [key: string]: any } = {};
                            ob[props.name] = a.id;
                            props.onChange(ob);
                          }
                        }}
                        key={i}
                        className="admin-select-form-item"
                      >
                        <p className="admin-select-form-item-value">{a.name}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="admin-select-form-item">
                  <p className="admin-select-form-item-value">No vendor match</p>
                </div>
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

export default SelectAPISuggetForm;
