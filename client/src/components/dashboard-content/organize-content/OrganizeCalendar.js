import Calendar from 'react-calendar'
import { useState } from 'react';
// import 'react-calendar/dist/Calendar.css';
import '../../../stylesheet/OrganizeCalendar.scss' ;

export default function OrganizeCalendar() {
  const [value, onChange] = useState();
  console.log(value)

  return (
    <div id="calendar-outer-container">
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true}
      />
    </div>
  );

}