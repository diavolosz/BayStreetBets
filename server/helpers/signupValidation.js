const validateEmail = email => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email);
};

const validatePassword = password => {
  return password.length >= 8;
};

const validatePasswordConfirmation = (password, password_confirmation) => {
  return password === password_confirmation;
};

const validateUsername = username => {
  const isAppropriateLength =
    username.length > 1 && username.length < 21 ? true : false;
  const regex = /^[a-zA-Z0-9]+$/;
  const isValidFormat = regex.test(username);
  if (!isAppropriateLength) {
    return "Username must be between 2 and 20 characters long.";
  } else if (!isValidFormat) {
    return "Username can only contain alphanumeric characters.";
  }

  return true;
};

module.exports = {
  validatePassword,
  validatePasswordConfirmation,
  validateEmail,
  validateUsername,
};
