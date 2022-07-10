import React, { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './arrival-date.scss';
import { FormateDateToTimeStamp, formatTimeStampToDate } from 'modules/admin/ultis';
interface Props {
  value: string;
  onChange: Function;
}

const ArrivalDate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (a: any) => {
    console.log('haha', FormateDateToTimeStamp(a));
    props.onChange({
      arrival_date: FormateDateToTimeStamp(a),
    });
  };
  return (
    <div className="product-detail-row arrival-date">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Arrival date</p>
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="product-detail-row-input arrivaldate-input product-detail-arrivaldate-input"
      >
        <input value={formatTimeStampToDate(Number(Date.parse(props.value) / 1000))} type="text" onChange={() => {}} />
        {open ? (
          <div className="product-detail-arrival-date-picker">
            <DayPicker mode="single" selected={new Date(Number(props.value))} onSelect={handleSelect} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ArrivalDate;
