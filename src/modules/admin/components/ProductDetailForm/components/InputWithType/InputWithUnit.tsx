import InputField from 'modules/admin/components/InputField/InputField';
import React from 'react';
import './input-with-unit.scss';
interface Props {
  unit?: { value: string }[];
  currentUnit: string;
  value: string;
  onChange: Function;
  name: string;
}

const InputWithUnit = (props: Props) => {
  return (
    <div className="input-with-unit">
      <p className="unit">{props.currentUnit}</p>
      <InputField
        value={Number(props.value).toFixed(2)}
        onChange={props.onChange}
        key_name={props.name}
        className="input"
        type="text"
      />
    </div>
  );
};

export default InputWithUnit;
