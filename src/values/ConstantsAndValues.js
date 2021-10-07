const emailFormatCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormatCheckRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const phoneFormatCheckRegex =
  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

export {
  emailFormatCheckRegex,
  passwordFormatCheckRegex,
  phoneFormatCheckRegex,
};
