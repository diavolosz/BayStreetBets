import { useForm } from "../../hooks/useForm";
import "../../stylesheet/Profile.scss";
import axios from "axios";

const ProfileEdit = (props) => {
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "username",
      placeholder: `${props.user_profile.username}`,
      value: `${props.user_profile.username}`,
      type: "username",
      required: true,
    },
    {
      name: "email",
      placeholder: `${props.user_profile.email}`,
      value: `${props.user_profile.email}`,
      type: "email",
      required: true,
    },
    {
      name: "password",
      placeholder: "Password",
      value: "",
      type: "password",
      required: true,
    },
    {
      name: "password_confirmation",
      placeholder: "Password Confirmation",
      value: "",
      type: "password",
      required: true,
    }
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
          required,
        }}
      />
    );
  });

  const onSubmit = event => {
    event.preventDefault();
    axios.post(`/api/user/${props.user_profile.id}/profile`, {
      ...formValues
    })
      .then((res) => {
        props.setState(prev => ({ ...prev, user_profile: res.data }))
        props.setComponent("EventStatistic")
      })
  };

  return (
    <div id="profile-inner-container">
      <h1>Edit Profile Information</h1>
      <form id="profile-form" onSubmit={onSubmit}>
        <img src="img/profile.png" />
        <div id="input-container">
          {inputFields}
          <input id="profile-update" type="submit" value="UPDATE" />
        </div>
      </form>
    </ div>
  );
};

export default ProfileEdit;