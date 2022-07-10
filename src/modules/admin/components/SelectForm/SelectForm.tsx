import './select-form.scss';
import React, { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: Function;
  key_name?: string;
  className?: string;
  options: { id: string; name: string; [key: string]: any }[];
  helperText?: string;
}
interface obj {
  [key: string]: string;
}
const SelectForm = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState('');
  useEffect(() => {
    const i = props.options.findIndex((a) => a.id == props.value);
    if (i == -1) {
      setText('');
    } else {
      setText(props.options[i].name);
    }
  }, [props.value, props.options]);

  return (
    <div className="select-form">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="select-form-value"
      >
        <p className="select-form-value-text">
          {text}
          <i className={open ? 'bx bx-chevron-down list-open' : 'bx bx-chevron-down'}></i>
        </p>
      </div>
      {open ? (
        <div className="select-form-list">
          {props.options.map((a, i) => {
            return (
              <div key={i} className="select-form-item">
                <p
                  onClick={() => {
                    setOpen(!open);
                    if (props.value !== a.id) {
                      if (props.key_name) {
                        const xx: obj = {};
                        xx[props.key_name] = a.id;
                        props.onChange(xx);
                      } else {
                        props.onChange(a.id);
                      }
                    }
                  }}
                  className="select-form-item-value"
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
export default SelectForm;
