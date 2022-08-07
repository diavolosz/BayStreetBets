import { useState, useEffect } from "react";

export const useForm = inputs  => {
  const parsedInputs = (inputs) => {
    const output = {};
    inputs.forEach((input) => {
      const {
        name,
        value = "",
        placeholder = "",
        required = false,
        type = "text",
      } = input;

      output[name] = { name, value, placeholder, required, type };
    });
    return output;
  };

  const [formValues, setFormValues] = useState(parsedInputs(inputs));
  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues };

    newFormValues[name].value = value;
    setFormValues(newFormValues);
  };

  useEffect(() => {
    const newErrors = [];
    for (const name in formValues) {
      const { required, value, placeholder } = formValues[name];
      if (required && !value) {
        newErrors.push({ name, placeholder });
      }
    }
    setErrors(newErrors);
  }, [formValues]);

  const parsedFormData = {};
  Object.values(formValues).forEach(
    ({ name, value }) => (parsedFormData[name] = value)
  );

  return [Object.values(formValues), parsedFormData, handleInput, errors];
}