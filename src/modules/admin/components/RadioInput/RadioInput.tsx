import React from 'react';
import './RadioInput.scss';
interface Props {
  value: string;
  options: { id: string; name: string; [key: string]: any }[];
  key_name: string;
  onChange: Function;
}
const RadioInput = (props: Props) => {
  const hanleChange = (value: string) => {
    const objectValue: { [key: string]: any } = {};
    objectValue[props.key_name] = value;
    props.onChange(objectValue);
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
              name={props.key_name}
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
