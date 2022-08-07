import { useForm } from "../hooks/useForm";
import axios from 'axios';

import "../stylesheet/SignupForm.scss";

const SignupForm = () => {
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "email",
      value: "",
      placeholder: "Email",
      type: "email",
      required: true,
    },
    {
      name: "username",
      value: "",
      placeholder: "Username",
      type: "text",
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
      placeholder: "Re-enter Password",
      value: "",
      type: "password",
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
          value: value,
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
    axios
      .post(`/signup`, {
        ...formValues,
      })
      .then(response => {
        localStorage.setItem("user", response.data.user);
      });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="form-title">Sign up</p>
      {inputFields}
      <input className="form-submit" type="submit" value="Sign Up" />
    </form>
  );
};

export default SignupForm;
