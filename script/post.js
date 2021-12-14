const postBtn = document.querySelector(".btnAdd");
const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector(".form");
const topicInput = document.getElementById("topic");
const questionInput = document.getElementById("question");
const answer1Input = document.getElementById("answer1");
const answer2Input = document.getElementById("answer2");
const answer3Input = document.getElementById("answer3");
const answer4Input = document.getElementById("answer4");
const radioChecks = document.querySelectorAll('input[name="correctAnswer"]');
let flag = false;
postBtn.onclick = () => {
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
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let correctAnswer;
  radioChecks.forEach((item, index) => {
    if (item.checked) {
      correctAnswer = item.value;
    }
  });
  const data = {
    topic: topicInput.value,
    question: questionInput.value,
    answer1: answer1Input.value,
    answer2: answer2Input.value,
    answer3: answer3Input.value,
    answer4: answer4Input.value,
    correct: correctAnswer,
  };
  console.log(data);

  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/question", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Success !!!");
      console.log("Success:", data);
    })
    .catch((error) => {
      alert("Something went wrong =( ");
      console.error("Error:", error);
    });
});
