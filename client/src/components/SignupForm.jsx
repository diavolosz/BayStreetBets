import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from '../hooks/useForm';

const SignupForm = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  }, [user]);

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
      required: true
    }
  ]);

  const inputFields = formValues.map((formInput) => {
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

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post(`/login`, {
      ...formValues
    })
    .then(response => {
      setUser(response.data.user)
      localStorage.setItem("user", response.data.user);
    });
  };

  return (
    <form onSubmit={onSubmit}>
      { inputFields }
      <input type="submit" value="Log In" />
      <div style={{color: 'white'}}>{user}</div>
    </form>
  )
};

export default SignupForm;