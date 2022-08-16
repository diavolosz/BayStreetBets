import Calendar from 'react-calendar'
import '../../../stylesheet/OrganizeCalendar.scss' ;

export default function OrganizeCalendar(props) {
  return (
    <div id="calendar-outer-container">
      <Calendar
        onChange={props.onChange}
        value={props.value}
        selectRange={true}
      />
    </div>
  );
}