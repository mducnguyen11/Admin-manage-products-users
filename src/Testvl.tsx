import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

const pastMonth = new Date(2020, 10, 15);

export default function App() {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 0),
  };
  const [range, setRange] = useState<DateRange | undefined>();
  console.log(range);

  return <DayPicker mode="range" defaultMonth={pastMonth} selected={range} onSelect={setRange} />;
}
