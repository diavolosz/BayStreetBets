import { useForm } from "../../hooks/useForm";
import "../../stylesheet/Profile.scss";

const ProfileEdit = () => {
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "username",
      value: "",
      placeholder: "Username",
      type: "username",
      required: true,
    },
    {
      name: "email",
      placeholder: "Email",
      value: "",
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
