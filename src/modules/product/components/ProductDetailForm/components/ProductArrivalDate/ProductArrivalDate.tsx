import React, { memo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { formateDateToTimeStamp, formatTimeStampToDateString } from 'utils/formatTime';

interface Props {
  value: string;
  onChange: Function;
}

const ProductArrivalDate = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (a: any) => {
    props.onChange({
      arrival_date: formateDateToTimeStamp(a),
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
        <input
          value={formatTimeStampToDateString(Number(Date.parse(props.value) / 1000))}
          type="text"
          onChange={() => {}}
        />
        {open ? (
          <div className="product-detail-arrival-date-picker">
            <DayPicker mode="single" selected={new Date(Number(props.value))} onSelect={handleSelect} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default memo(ProductArrivalDate);
