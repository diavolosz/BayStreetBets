import "../../stylesheet/Organize.scss"
import { useForm } from "../../hooks/useForm";
import OrganizeCalendar from "./organize-content/OrganizeCalendar";

export default function Organize(prop) {

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
    {
      name: "max_participant",
      placeholder: "Maximum Participants",
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
    console.log(formValues);
    // axios.post(`/login`, {
    //   ...formValues
    // })
    // .then(response => {
    //   setUser(response.data.user)
    //   localStorage.setItem("user", response.data.user);
    // });
  };


  return (
    <div id="organize-inner-container">
      <h1>Choose Event Duration</h1>
      <div id="calender-container">
        <img src="img/bear.png" className="bull-bear" />
        <div id="calender">
          <OrganizeCalendar />
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