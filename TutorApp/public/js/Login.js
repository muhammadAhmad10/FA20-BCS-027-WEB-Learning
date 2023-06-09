const User = require("../../models/user");

function handleSubmit() {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var input = document.getElementById("floatingInput");
  var input1 = document.getElementById("floatingPassword");
  if (input.value && input.value.match(validRegex)) {
    console.log("Email is: ", input.value);
    input.value = "";
    input.classList.remove("error");
    input.classList.add("success");
  } else {
    input.classList.remove("success");
    input.classList.add("error");
  }

  if (input1.value && input1.value.length >= 6) {
    console.log("Password is: ", input1.value);
    input1.value = "";
    input1.classList.remove("error");
    input1.classList.add("success");
  } else {
    input1.classList.remove("success");
    input1.classList.add("error");
  }
}
