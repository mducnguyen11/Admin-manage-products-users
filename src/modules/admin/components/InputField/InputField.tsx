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
}
const InputField = (props: Props) => {
  const [text, setText] = useState('');
  const [change, setChange] = useState(false);
  useEffect(() => {
    setText(props.value);
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
          if (!change) {
            setChange(true);
          }
        }}
        onBlur={async () => {
          if (props.value !== text) {
            if (props.key_name) {
              const objz: { [key: string]: any } = {};
              objz[props.key_name as keyof typeof objz] = text;
              await props.onChange(objz);
              if (change) {
                setChange(false);
              }
            } else {
              if (props.value !== text) {
                await props.onChange(text);
              }
              if (change) {
                setChange(false);
              }
            }
          } else {
            if (props.value == text && text == '') {
              if (props.key_name) {
                const objz: { [key: string]: any } = {};
                objz[props.key_name as keyof typeof objz] = '';
                await props.onChange(objz);
                if (change) {
                  setChange(false);
                }
              } else {
                await props.onChange('');
                if (change) {
                  setChange(false);
                }
              }
            }
          }
        }}
      />
      <div className="input-error-message">
        {props.error && !change ? (
          <span className="error-message"> {<FormattedMessage id={props.error} />}</span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
