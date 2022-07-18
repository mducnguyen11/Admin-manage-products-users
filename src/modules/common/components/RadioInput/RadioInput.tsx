import React from 'react';
import './RadioInput.scss';
interface Props {
  value: string;
  options: { value: string; name: string; [key: string]: any }[];
  onChange: (value: string) => void;
}
const RadioInput = (props: Props) => {
  const hanleChange = (value: string) => {
    props.onChange(value);
  };
  return (
    <>
      {props.options.map((option, i) => {
        return (
          <div key={i} className="radio-input-item">
            <input
              checked={props.value == option.id}
              onChange={() => {
                hanleChange(option.id);
              }}
              type="radio"
              value={option.id}
            />
            <label>{option.name}</label>
          </div>
        );
      })}
    </>
  );
};

export default RadioInput;
