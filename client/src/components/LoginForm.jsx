import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "./Alert";
import { useForm } from "../hooks/useForm";
import "../stylesheet/LoginForm.scss";

const LoginForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formValues, parsedFormData, handleInput, errors] = useForm([
    {
      name: "email",
      value: "",
      placeholder: "Email",
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
    axios
      .post(`/api/login`, {
        ...formValues,
      })
      .then(response => {
        if (!response.data.accessToken) {
          setError("Invalid credentials.");
          return;
        }
        // console.log ('response', response)
        localStorage.setItem("user", response.data.accessToken);
        navigate("/");
      });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <Alert message={error} onClose={setError} />}
      <p className="form-title">Log in</p>
      {inputFields}
      <input className="form-submit" type="submit" value="Log In" />
    </form>
  );
};

export default LoginForm;
