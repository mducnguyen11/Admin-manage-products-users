import InputField from 'modules/common/components/InputField/InputField';
import React from 'react';
import './input-with-unit.scss';
interface Props {
  unit?: { value: string }[];
  currentUnit: string;
  value: string;
  onChange: (value: string) => void;
  key_name: string;
  error?: string;
}

const InputWithUnit = (props: Props) => {
  return (
    <div className="input-with-unit">
      <p className="unit">{props.currentUnit}</p>
      <InputField
        onlyNumber
        value={Number(props.value).toFixed(2)}
        onChange={props.onChange}
        className="input"
        type="text"
        error={props.error}
      />
    </div>
  );
};

export default InputWithUnit;
