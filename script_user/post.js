const createBtn = document.querySelector(".btnAdd");
const form = document.querySelector(".form");
const submitBtn = document.querySelector(".submitBtn");
const errorDivU = document.querySelector(".errorUsername");
const errorDivE = document.querySelector(".errorEmail");
const passwordInput = document.querySelector("#password");
let flag = false;
createBtn.onclick = function () {
  if (flag === false) {
    form.style.marginTop = "60px";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    flag = true;
  } else {
    form.style.marginTop = "-860px";
    flag = false;
  }
};
submitBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const phonenumber = document.querySelector("#phonenumber");

  errorDivU.innerHTML = "";
  errorDivE.innerHTML = "";
  //validate email
  console.log(email.value);
  const validateEmail = (email) => {
    var regex =
      /^(([^<>()[\]\\.,;: \s @\ "]+(\.[^<> ()[\]\\., ;: \s @\ "]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
  if (validateEmail(email.value)) {
    console.log("Valid email <3");
    const bodyRegister = {
      username: username.value,
      email: email.value,
      password: password.value,
      phonenumber: phonenumber.value,
    };
    fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRegister), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === false) {
          if (data.at === "username") {
            document.querySelector(".errorUsername").innerHTML =
              "* " + data.message;
          } else {
            document.querySelector(".errorEmail").innerHTML =
              "* " + data.message;
          }
        } else {
          alert("Successful!!!");
          location.reload();
        }
      })
      .catch((error) => console.log(error));
  } else {
    alert("Invalid email =((");
    document.querySelector(".errorEmail").innerHTML = "* Invalid Email!";
    email.focus();
  }
});
const eye = document.querySelector(".fa-eye");
const eyeSlash = document.querySelector(".fa-eye-slash");
eyeSlash.classList.add("d-none");
eye.onclick = () => {
  passwordInput.setAttribute("type", "text");
  eyeSlash.classList.remove("d-none");
  eye.classList.add("d-none");
};
eyeSlash.onclick = () => {
  passwordInput.setAttribute("type", "password");
  eye.classList.remove("d-none");
  eyeSlash.classList.add("d-none");
};
