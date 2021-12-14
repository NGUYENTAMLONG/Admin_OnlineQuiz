function updateQuestion(x, id) {
  const question = x.parentElement.parentElement;
  const questionId = id;
  const tdTags = question.querySelectorAll("td");
  const a = [
    tdTags[0].innerHTML,
    tdTags[1].innerHTML,
    tdTags[2].innerHTML,
    tdTags[3].innerHTML,
    tdTags[4].innerHTML,
    tdTags[5].innerHTML,
    tdTags[6].querySelector("span").textContent,
  ];
  //   console.log(detailQuestionValue);
  tdTags.forEach((item, index) => {
    // console.log(detailQuestionValue);
    if (index !== 6 && index !== 7) {
      let val = item.textContent;
      item.innerHTML = "";
      let inputElement = document.createElement("TEXTAREA");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("class", "form-control");
      inputElement.value = val;
      item.appendChild(inputElement);
    } else if (index === 6) {
      let itemParentContent = item.querySelector("span").innerHTML;
      let myArray = ["A", "B", "C", "D"];
      let radioHtmls = myArray.map((item, index) => {
        return `<div class="form-check ml-2 mr-2">
          <input
            class="form-check-input"
            type="radio"
            value="${item}"
            name="correctAnswer"
            id="${item}"
            ${item === itemParentContent && "checked"}
          />
          <label class="form-check-label" for="${item}"> ${item} </label>
        </div>`;
      });
      item.innerHTML = radioHtmls.join("");
    } else {
      item.innerHTML = `
        <button class="btn btn-success mb-2 btnSubmitUpdate" onClick="handleSubmitUpdate(this,'${questionId}')">Submit</button>
        <button class="btn btn-warning btnCancelUpdate" onClick="handleCancelUpdate(this,'${questionId}','${a[0]}','${a[1]}','${a[2]}','${a[3]}','${a[4]}','${a[5]}','${a[6]}')">Cancel</button>`;
    }
  });
  disabledHandle(true);
}
function handleSubmitUpdate(it, id) {
  const questionValue = it.parentElement.parentElement;
  const tdTags = questionValue.querySelectorAll("td");
  const dataUpdate = {
    topic: tdTags[0].querySelector("textarea").value,
    question: tdTags[1].querySelector("textarea").value,
    answer1: tdTags[2]
      .querySelector("textarea")
      .value.split("")
      .splice(3)
      .join(""),
    answer2: tdTags[3]
      .querySelector("textarea")
      .value.split("")
      .splice(3)
      .join(""),
    answer3: tdTags[4]
      .querySelector("textarea")
      .value.split("")
      .splice(3)
      .join(""),
    answer4: tdTags[5]
      .querySelector("textarea")
      .value.split("")
      .splice(3)
      .join(""),
    correct: Array.from(tdTags[6].querySelectorAll(".form-check-input")).find(
      (radio) => radio.checked
    ).value,
  };
  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/question/" + id, {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  })
    .then((response) => response.json())
    .then((data) => {
      tdTags[0].innerHTML = `${dataUpdate.topic}`;
      tdTags[1].innerHTML = `${dataUpdate.question}`;
      tdTags[2].innerHTML = `A. ${dataUpdate.answer1}`;
      tdTags[3].innerHTML = `B. ${dataUpdate.answer2}`;
      tdTags[4].innerHTML = `C. ${dataUpdate.answer3}`;
      tdTags[5].innerHTML = `D. ${dataUpdate.answer4}`;
      tdTags[6].innerHTML = ` <span class="badge bg-success text-light" style="font-size:20px" >${dataUpdate.correct}</span>`;
      tdTags[7].innerHTML = `   <td class="text-center"><button class="btn btn-primary btnUpdate" title="Update"
      onClick="updateQuestion(this,'${id}')"
      ><i class="fas fa-edit"></i> </button> 
      <button class="btn btn-danger btnDelete" title="Delete"
      onClick="deleteQuestion(this,'${id}')"
      ><i class="far fa-trash-alt"></i></button></td>`;

      alert("Updated Successful ^^ !");
      disabledHandle(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Something went wrong T-T !");
    });
}
function handleCancelUpdate(
  it,
  id,
  topic,
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correct
) {
  const q = it.parentElement.parentElement;
  const arrs = [topic, question, answer1, answer2, answer3, answer4, correct];
  q.querySelectorAll("td").forEach((item, index) => {
    if (index < 6) {
      item.innerHTML = arrs[index];
    } else if (index === 6) {
      item.innerHTML = `    <span class="badge bg-success text-light" style="font-size:20px" >${arrs[6]}</span>`;
    } else {
      item.innerHTML = `<button class="btn btn-primary btnUpdate" title="Update"
        onClick="updateQuestion(this,'${id}')"
        ><i class="fas fa-edit"></i></button> 
        <button class="btn btn-danger btnDelete" title="Delete"
        onClick="deleteQuestion(this,'${id}')"
        ><i class="far fa-trash-alt"></i></button>`;
    }
  });
  disabledHandle(false);
}

function disabledHandle(flag) {
  if (flag === true) {
    document.querySelectorAll(".btnUpdate").forEach((item, index) => {
      item.setAttribute("disabled", "");
    });
  } else {
    document.querySelectorAll(".btnUpdate").forEach((item, index) => {
      item.removeAttribute("disabled");
    });
  }
}
