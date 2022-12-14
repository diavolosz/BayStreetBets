import { useState } from "react";
import axios from 'axios';
import { useForm } from "../../hooks/useForm";
import OrganizeCalendar from "./organize-content/OrganizeCalendar";
import ErrorAlert from "./eventStatistic-content/ErrorAlert";

import { addToUserCompetitionCreated, addToCompetitions } from "../../helpers/selectors";

import "../../stylesheet/Organize.scss"

export default function Organize(props) {
  const [calender, setCalender] = useState(null);
  const [displayAlert, setDisplayAlert] = useState("")
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "name",
      value: "",
      placeholder: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      placeholder: "Short Description",
      value: "",
      type: "text",
      required: true,
    },
    {
      name: "stating_amount",
      placeholder: "Trade Starting Amount",
      value: "",
      type: "number",
      required: true,
    },
  ]);

  const inputFields = formValues.map(formInput => {
    const { name, placeholder, type, required, value } = formInput;

    return (
      <input
        {...{
          key: name,
          name,
          value,
          placeholder,
          onChange: handleInput,
          type,
          required
        }}
      />
    );
  });

  const onSubmit = event => {
    event.preventDefault();
    
    // Validate calender input
    if (!calender || !calender[1]) {
      setCalender(null);
      return setDisplayAlert("ErrorAlert-dateMissing");
    }
    if (calender[0] < new Date()) {
      setCalender(null);
      return setDisplayAlert("ErrorAlert-past");
    }
    
    const submissionValues = { ...formValues, "4": calender, user: localStorage.getItem("user") };

    axios.post(`/api/competitions`, submissionValues)
    .then(response => {
      const newCompetition = response.data.rows[0];
      const updatedCompetitionsCreated = addToUserCompetitionCreated(props.state, newCompetition); 
      const updatedCompetitions = addToCompetitions(props.state, newCompetition); 
      props.setState(prev => ({
        ...prev,
        user_competitions_created: updatedCompetitionsCreated,
        competitions: updatedCompetitions
      }));
      props.setComponent("Browse");
    });
  };

  return (
    <div id="organize-inner-container">
      <h1>Enter Event Details</h1>
      <div id="calender-container">
        <img src="img/bear.png" className="bull-bear" />
        <div id="calender">
          <OrganizeCalendar onChange={setCalender} value={calender}/>
          {displayAlert === "ErrorAlert-past" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"Competition must start at a future date."} />
          }
          {displayAlert === "ErrorAlert-dateMissing" && <ErrorAlert setDisplayAlert={() => setDisplayAlert} message={"Select a date range."} />
          }
        </div>
        <img src="img/bull.png" className="bull-bear" />
      </div>
      <form id="organize-input-form" onSubmit={onSubmit}>
        {inputFields}
        <input id="organize-submit" type="submit" value="CONFIRM" />
      </form>
    </div>
  )
}