import React from 'react';
import './radio-input.scss';
interface Props {
  value: string;
  options: { id: string; name: string; [key: string]: any }[];
  key_name: string;
  onChange: Function;
}

const RadioInput = (props: Props) => {
  const hanleChange = (a: string) => {
    const b: { [key: string]: any } = {};
    b[props.key_name] = a;
    props.onChange(b);
  };
  return (
    <>
      {props.options.map((a, i) => {
        return (
          <div key={i} className="radio-input-item">
            <input
              checked={props.value == a.id}
              onChange={() => {
                hanleChange(a.id);
              }}
              type="radio"
              name={props.key_name}
              value={a.id}
            />
            <label>{a.name}</label>
          </div>
        );
      })}
    </>
  );
};

export default RadioInput;
