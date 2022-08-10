import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import { useForm } from "../hooks/useForm";

import Alert from "./Alert";
import "../stylesheet/SignupForm.scss";

const SignupForm = () => {
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
    axios
      .post(`/api/signup`, {
        ...formValues,
      })
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        localStorage.setItem("user", response.data.user);
        navigate("/");
      });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <Alert message={error} onClose={setError} />}
      <p className="form-title">Sign up</p>
      {inputFields}
      <input className="form-submit" type="submit" value="Sign Up" />
    </form>
  );
};

export default SignupForm;
