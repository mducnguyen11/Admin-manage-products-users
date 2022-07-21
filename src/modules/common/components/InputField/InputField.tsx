import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  onClick?: () => void;
  error?: string;
  onBlur?: (value: string) => void;
}
const InputField = (props: Props) => {
  const [textValue, setTextValue] = useState('');
  const [isTyping, setTyping] = useState<boolean>(false);
  useEffect(() => {
    if (props.value !== textValue) {
      if (props.type == 'number') {
        setTextValue(Number(props.value).toFixed(2));
      } else {
        setTextValue(props.value);
      }
    }
  }, [props.value]);
  const checkNumberValue = (value: string) => {
    if (value == '') {
      console.log('value :', value);
      return true;
    } else {
      const arraay = value.split('.');
      if (arraay.length >= 2) {
        if (arraay[1].length > 2) {
          return false;
        }
      }
      if (
        arraay.findIndex((a, i) => {
          if (/^\d+$/.test(a)) {
            return a;
          }
        }) == -1
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  return (
    <div className="admin-input-form-wrapper">
      {props.type == 'number' ? (
        <>
          <input
            onClick={() => {
              props.onClick ? props.onClick() : () => {};
            }}
            className={`admin-input-form ${props.className ? props.className : ''}`}
            type={'text'}
            placeholder={props.placeholder ? props.placeholder : ''}
            value={textValue}
            onChange={(e) => {
              const value = e.target.value;
              if (!checkNumberValue(value)) {
                return;
              }
              setTextValue(e.target.value);
              if (props.error == 'requiredField') {
                props.onChange(e.target.value);
              }
              if (!isTyping) {
                setTyping(true);
              }
            }}
            onBlur={() => {
              setTyping(false);
              if (props.onBlur) {
                props.onBlur(textValue);
              } else {
                if (props.value !== textValue) {
                  props.onChange(textValue);
                } else {
                  if (props.value == textValue && textValue == '') {
                    props.onChange('');
                  }
                }
              }
            }}
          />
        </>
      ) : (
        <input
          onClick={() => {
            props.onClick ? props.onClick() : () => {};
          }}
          className={`admin-input-form ${props.className ? props.className : ''}`}
          type={props.type || 'text'}
          placeholder={props.placeholder ? props.placeholder : ''}
          value={textValue}
          onChange={(e) => {
            setTextValue(e.target.value);
            if (props.error == 'requiredField') {
              props.onChange(e.target.value);
            }
            if (!isTyping) {
              setTyping(true);
            }
          }}
          onBlur={() => {
            setTyping(false);
            if (props.onBlur) {
              props.onBlur(textValue);
            } else {
              if (props.value !== textValue) {
                props.onChange(textValue);
              } else {
                if (props.value == textValue && textValue == '') {
                  props.onChange('');
                }
              }
            }
          }}
        />
      )}
      <div className="input-error-message">
        {props.error && !isTyping ? (
          <span className="error-message"> {<FormattedMessage id={props.error} />}</span>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
