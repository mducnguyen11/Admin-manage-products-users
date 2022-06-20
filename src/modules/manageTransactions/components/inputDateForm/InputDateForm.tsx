import React from 'react';
import './input-date-form.scss';
interface Props {
  label: string;
  id?: string;
  name: string;
  changeState: Function;
  value: string;
}
interface DateObject {
  [key: string]: string;
}

const InputDateForm = (props: Props) => {
  return (
    <div className="table-input-date-form">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        onChange={(e) => {
          const DateObject1: DateObject = {};
          DateObject1[props.name] = e.target.value;
          props.changeState(DateObject1);
        }}
        name={props.name}
        id={props.id}
        value={props.value}
        type="date"
      />
    </div>
  );
};

export default InputDateForm;
