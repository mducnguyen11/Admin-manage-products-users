import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: Function;
  key_name?: string;
  className?: string;
  onClick?: Function;
  error?: string;
  onlyNumber?: boolean;
}
const InputField = (props: Props) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (props.value !== text) {
      setText(props.value);
    }
  }, [props.value]);
  return (
    <div className="admin-input-form-wrapper">
      <input
        onClick={() => {
          props.onClick ? props.onClick() : () => {};
        }}
        className={`admin-input-form ${props.className ? props.className : ''}`}
        type={props.type || 'text'}
        name={props.key_name}
        placeholder={props.placeholder ? props.placeholder : ''}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (props.error) {
            const objz: { [key: string]: any } = {};
            objz[props.key_name as keyof typeof objz] = e.target.value;
            props.onChange(objz);
          }
        }}
        onKeyPress={(e) => {
          if (props.onlyNumber) {
            if (!e.code.includes('Digit')) {
              e.preventDefault();
            } else {
              return e;
            }
          }
        }}
        onBlur={() => {
          if (props.value !== text) {
            if (props.key_name) {
              const objz: { [key: string]: any } = {};
              objz[props.key_name as keyof typeof objz] = text;
              props.onChange(objz);
            } else {
              if (props.value !== text) {
                props.onChange(text);
              }
            }
          } else {
            if (props.value == text && text == '') {
              if (props.key_name) {
                const objz: { [key: string]: any } = {};
                objz[props.key_name as keyof typeof objz] = '';
                props.onChange(objz);
              } else {
                props.onChange('');
              }
            }
          }
        }}
      />
      <div className="input-error-message">
        {props.error ? <span className="error-message"> {<FormattedMessage id={props.error} />}</span> : null}
      </div>
    </div>
  );
};

export default InputField;
