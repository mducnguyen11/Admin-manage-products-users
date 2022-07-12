import { formateDateToTimeStamp, formatTimeStampToDateString } from 'modules/admin/ultis';
import React, { useEffect, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './filter-date-range.scss';
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
        console.log('from :', formatTimeStampToDateString(formateDateToTimeStamp(a.from)));
        tt.push(formatTimeStampToDateString(formateDateToTimeStamp(a.from)));
      }
      if (a.to) {
        tt.push(formatTimeStampToDateString(formateDateToTimeStamp(a.to)));
      }
    }
    return tt;
  };
  useEffect(() => {
    const b: string[] = [];
    const xx = inputValueDateRange.split(',');

    xx.forEach((l, i) => {
      const t = new Date(l);
      if (t.toDateString() !== 'Invalid Date') {
        b.push(formatTimeStampToDateString(formateDateToTimeStamp(t)));
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
          className="admin-input-form"
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
        <>
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
          <div
            onClick={() => {
              setOpenDatePicker(false);
            }}
            className="filter-field-input-daypicker-background"
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default FilterDateRange;
