import './chekcmarks.scss';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  value: { id: string; name: string; [key: string]: any }[];
  onChange: (a: { [key: string]: { id: string; name: string; [key: string]: any }[] }) => void;
  key_name: string;
  className?: string;
  options: { id: string; name: string; [key: string]: any }[];
  helperText?: string;
  error?: string;
}

const Checkmarks = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [listOp, setListOp] = useState<{ id: string; name: string; [key: string]: any }[]>([]);
  const handleRemoveValue = (id: string) => {
    const obj: { [key: string]: any } = {};
    obj[props.key_name] = [
      ...props.value
        .filter((a) => a.id !== id)
        .map((a) => {
          return {
            id: a.id,
            name: a.name,
          };
        }),
    ];
    props.onChange(obj);
  };
  useEffect(() => {
    setListOp(props.options);
  }, [props.options]);

  const handleSuggetValue = (e: string) => {
    setValue(e);
    setListOp([
      ...props.options.filter((a) => {
        if (a.name.toLowerCase().includes(e.toLowerCase())) {
          return a;
        }
      }),
    ]);
  };
  return (
    <div className=" checkmarks-form">
      <div className="checkmarks-form-value">
        <div className="checkmarks-form-value-list">
          {props.value.map((a) => {
            return (
              <p key={a.id} className="checkmarks-form-value-item">
                <span>{a.name}</span>
                <i
                  onClick={() => {
                    handleRemoveValue(a.id);
                  }}
                  className="bx bx-x"
                ></i>
              </p>
            );
          })}
          <input
            value={value}
            autoFocus={open}
            onClick={() => {
              setOpen(true);
            }}
            onChange={(e) => {
              handleSuggetValue(e.target.value);
            }}
            className="checkmarks-form-value-input"
            type="text"
          />
        </div>
        <i
          className={
            open
              ? 'bx bx-chevron-down list-open checkmarks-form-open-value'
              : 'checkmarks-form-open-value bx bx-chevron-down'
          }
          onClick={() => {
            setOpen(!open);
          }}
        ></i>
      </div>
      <div className="checkmarks-form-error-message">
        {props.error ? <span className="error-message"> {<FormattedMessage id={props.error} />}</span> : null}
      </div>
      {open ? (
        <div className=" checkmarks-form-list">
          {listOp.map((a, i) => {
            return (
              <div key={i} className="checkmarks-form-item">
                <p
                  onClick={() => {
                    console.log('vcl ae', a);
                    setValue('');
                    if (props.value.findIndex((b) => b.id == a.id) == -1) {
                      const xx: { id: string; name: string } = { id: a.id, name: a.name };
                      const ll = props.value.map((a) => {
                        return {
                          id: a.id,
                          name: a.name,
                        };
                      });
                      ll.push(xx);
                      const obj: { [key: string]: any } = {};
                      obj[props.key_name] = ll;
                      props.onChange(obj);
                    }
                    setOpen(!open);
                  }}
                  className="checkmarks-form-item-value"
                >
                  {' '}
                  {a.name}{' '}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
      {props.helperText ? <span className="helper-text">{props.helperText}</span> : null}
    </div>
  );
};
export default Checkmarks;
