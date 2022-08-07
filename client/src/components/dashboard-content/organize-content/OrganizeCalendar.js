import Calendar from 'react-calendar'
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

export default function OrganizeCalendar() {
  const [value, onChange] = useState(new Date());
  console.log(value)

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
      />
    </div>
  );

}