import { useForm } from "../hooks/useForm";
import axios from 'axios';
import "../stylesheet/LoginForm.scss";

const LoginForm = () => {
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "email",
      value: "",
      placeholder: "Email",
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
    axios.post(`/login`, {
      ...formValues
    })
    .then(response => {
      localStorage.setItem("user", response.data.user);
    });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="form-title">Log in</p>
      {inputFields}
      <input className="form-submit" type="submit" value="Log In" />
    </form>
  );
};

export default LoginForm;
