import { FormateDateToTimeStamp, FormatTimeStampToDateString } from 'modules/admin/ultis';
import React, { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
interface Props {
  value: string[];
  onChange: Function;
}

const FilterDateRange = (props: Props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [inputValueDateRange, setInputValueDateRange] = useState<string>('');

  useEffect(() => {
    const xx = props.value;
    console.log('value : ', xx);
    if (xx.length > 0) {
      if (xx.length == 1) {
        setRange({
          from: new Date(xx[0]),
        });
      } else {
        setRange({
          from: new Date(xx[0]),
          to: new Date(xx[1]),
        });
      }
    }
  }, [props.value]);

  const handleDateSelect = (
    a:
      | {
          from?: Date;
          to?: Date;
        }
      | undefined,
  ): string[] => {
    const tt: string[] = [];
    if (a) {
      if (a.from) {
        console.log('from :', FormatTimeStampToDateString(FormateDateToTimeStamp(a.from)));
        tt.push(FormatTimeStampToDateString(FormateDateToTimeStamp(a.from)));
      }
      if (a.to) {
        tt.push(FormatTimeStampToDateString(FormateDateToTimeStamp(a.to)));
      }
    }
    return tt;
  };
  useEffect(() => {
    const b: string[] = [];
    const xx = inputValueDateRange.split(',');
    console.log(xx);
    xx.forEach((l, i) => {
      const t = new Date(l);
      if (t.toDateString() !== 'Invalid Date') {
        b.push(FormatTimeStampToDateString(FormateDateToTimeStamp(t)));
      }
    });
    props.onChange({
      date_range: b,
    });
  }, [inputValueDateRange]);
  return (
    <div className="filter-field-input">
      <div
        className="filter-field-input-value"
        onClick={() => {
          setOpenDatePicker(!openDatePicker);
        }}
      >
        <input
          className="input-form"
          type="text"
          value={inputValueDateRange}
          onChange={(e) => {
            setInputValueDateRange(e.target.value);
          }}
        />
      </div>
      <i
        onClick={() => {
          setOpenDatePicker(!openDatePicker);
        }}
        className={openDatePicker ? 'bx bx-chevron-down open-list' : 'bx bx-chevron-down'}
      ></i>
      {openDatePicker ? (
        <div className="filter-field-input-daypicker">
          <DayPicker
            mode="range"
            selected={range}
            defaultMonth={range?.from}
            onSelect={(a) => {
              const tt = handleDateSelect(a);
              let z = '';
              tt.forEach((l, i) => {
                console.log('L ', l);
                if (i == 0) {
                  z += l;
                } else {
                  z += ',' + l;
                }
              });
              console.log('tt :', tt);
              setInputValueDateRange(z);
              props.onChange({
                date_range: tt,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilterDateRange;
