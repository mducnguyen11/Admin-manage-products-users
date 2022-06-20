import React from 'react';
import './select-form.scss';
import { useState } from 'react';
interface Props {
  options: { value: string; name: string }[];
  name: string;
  changeState: Function;
  value?: string;
}

const SelectForm = (props: Props) => {
  return (
    <div className="table-select-form">
      <select
        name={props.name}
        onChange={(e) => {
          props.changeState({
            status: e.target.value,
          });
        }}
        value={props.value}
      >
        <option value="">Status</option>
        {props.options.map((a, i) => {
          return (
            <option key={i} value={a.value}>
              {a.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectForm;
