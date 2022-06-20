import React from 'react';
import './input-form.scss';
interface Props {
  name: string;
  changeState: Function;
  label: string;
  value: string;
}

const InputForm = (props: Props) => {
  return (
    <div className="input-table">
      <input
        className=""
        onChange={(e) => {
          props.changeState({
            invoice: e.target.value,
          });
        }}
        name={props.name}
        type="text"
        value={props.value}
        placeholder={props.label + '#'}
      />
    </div>
  );
};

export default InputForm;
