import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './Input-form.scss';
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
    console.log('props change');
    setText(props.value);
  }, [props.value]);
  return (
    <div className="input-form-wrapper">
      <input
        onClick={() => {
          props.onClick ? props.onClick() : () => {};
        }}
        className={`input-form ${props.className ? props.className : ''}`}
        type={props.type || 'text'}
        name={props.key_name}
        placeholder={props.placeholder ? props.placeholder : ''}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          console.log(change);
          if (!change) {
            setChange(true);
          }
        }}
        onBlur={async () => {
          console.log('vcl');
          if (props.value !== text) {
            console.log('a');
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
      {props.error && !change ? <span className="error-message"> {<FormattedMessage id={props.error} />}</span> : null}
    </div>
  );
};

export default InputField;
