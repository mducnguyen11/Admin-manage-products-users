import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onClick?: () => void;
  fixNumber?: number;
  error?: string;
  onlyNumber?: boolean;
  onBlur?: (value: string) => void;
}
const InputField = (props: Props) => {
  const [textValue, setTextValue] = useState(props.value);
  const [isTyping, setTyping] = useState<boolean>(false);
  useEffect(() => {
    if (props.value !== textValue) {
      setTextValue(props.value);
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
        placeholder={props.placeholder ? props.placeholder : ''}
        value={props.fixNumber && textValue ? Number(textValue).toFixed(props.fixNumber) : textValue}
        onChange={(e) => {
          setTextValue(e.target.value);
          if (props.error == 'requiredField') {
            props.onChange(e.target.value);
          }
          if (!isTyping) {
            setTyping(true);
          }
        }}
        onKeyPress={(e) => {
          if (props.onlyNumber) {
            if (Number(e.key) || Number(e.key) == 0) {
              return e;
            } else {
              e.preventDefault();
            }
          }
        }}
        onBlur={() => {
          setTyping(false);
          if (props.onBlur) {
            props.onBlur(textValue);
          } else {
            if (props.value !== textValue) {
              if (props.value !== textValue) {
                props.onChange(textValue);
              }
            } else {
              if (props.value == textValue && textValue == '') {
                props.onChange('');
              }
            }
          }
        }}
      />
      <div className="input-error-message">
        {props.error && !isTyping ? (
          <span className="error-message"> {<FormattedMessage id={props.error} />}</span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
