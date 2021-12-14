const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function renderPaging(questions) {
  let num = questions.length;
  let pag = Math.ceil(num / 5);
  let array = [];
  for (let i = 1; i <= pag; i++) {
    array.push(i);
  }
  let htmls = array.map((item, index) => {
    return `
     <li class="page-item"  onClick = "handleChangePage(${
       index + 1
     })"><a class="page-link" href="#">${index + 1}</a></li>
     `;
  });
  document.querySelector(".pages").innerHTML = htmls.join("");
  document.querySelectorAll(".page-item")[0].classList.add("active");
  prevBtn.style.display = "none";
}
function renderQuestions(result) {
  let htmls = result["resultPage"].map((item, index) => {
    return `
     <tr>
         <th scope="row">${index + 1}</th>
         <td>${item.topic}</td>
         <td>${item.question}</td>
         <td>A. ${item.answer1}</td>
         <td>B. ${item.answer2}</td>
         <td>C. ${item.answer3}</td>
         <td>D. ${item.answer4}</td>
         <td class="text-center">
      <span class="badge bg-success text-light" style="font-size:20px" >${
        item.correct
      }</span>
          
         </td>
         <td class="text-center"><button class="btn btn-primary btnUpdate" title="Update"
          onClick="updateQuestion(this,'${item._id}')"
          ><i class="fas fa-edit"></i> </button> 
          <button class="btn btn-danger btnDelete" title="Delete"
          onClick="deleteQuestion(this,'${item._id}')"
          ><i class="far fa-trash-alt"></i></button></td>
       </tr>
     `;
  });
  document.querySelector("tbody").innerHTML = htmls.join("");
}
const sumQuestionBadge = document.querySelector(".sumQuestion");
const sumTopicBadge = document.querySelector(".sumTopic");
const sumTopicNameBadge = document.querySelector(".topicName");
fetch("https://onlinequiz-app-ver1.herokuapp.com/api/question")
  .then((res) => res.json())
  .then((data) => {
    renderPaging(data);
    sumQuestionBadge.innerHTML = data.length;
    const array = [];
    data.forEach((question, index) => {
      array.push(question.topic);
    });
    //category select
    const arrayTopics = [...new Set(array)];
    let arrayTopicsForSelect = ["Paging", "All", ...arrayTopics];
    document.querySelector(".selectCategory").innerHTML = arrayTopicsForSelect
      .map((item, index) => {
        return `<option value="${item}">${item}</option>`;
      })
      .join("");
    //
    sumTopicBadge.innerHTML = arrayTopics.length;
    let htmls = arrayTopics.map((item, index) => {
      return `<li>${index + 1} - ${item}</li>`;
    });
    sumTopicNameBadge.innerHTML = htmls.join("");
  })
  .catch((error) => console.log(error));
fetch("https://onlinequiz-app-ver1.herokuapp.com/api/paging?page=1&limit=5")
  .then((res) => res.json())
  .then((data) => {
    console.log("this is here", data);
    renderQuestions(data);
  })
  .catch((error) => console.log(error));
function handleChangePage(index) {
  console.log(index);
  let finalPageIndex = document.querySelectorAll(".page-item").length;
  console.log(finalPageIndex);
  if (index === finalPageIndex) {
    fetch(
      `https://onlinequiz-app-ver1.herokuapp.com/api/paging?page=${index}&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        renderQuestions(data);
      });
    document.querySelectorAll(".page-item").forEach((item, index) => {
      if (item.className === "page-item active") {
        item.classList.remove("active");
      }
    });
    document.querySelectorAll(".page-item")[index - 1].classList.add("active");
    nextBtn.style.display = "none";
    prevBtn.style.display = "block";
  } else if (index === 1) {
    fetch(
      `https://onlinequiz-app-ver1.herokuapp.com/api/paging?page=${index}&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        renderQuestions(data);
      });
    document.querySelectorAll(".page-item").forEach((item, index) => {
      if (item.className === "page-item active") {
        item.classList.remove("active");
      }
    });
    document.querySelectorAll(".page-item")[index - 1].classList.add("active");
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
  } else {
    fetch(
      `https://onlinequiz-app-ver1.herokuapp.com/api/paging?page=${index}&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        renderQuestions(data);
      });
    document.querySelectorAll(".page-item").forEach((item, index) => {
      if (item.className === "page-item active") {
        item.classList.remove("active");
      }
    });
    document.querySelectorAll(".page-item")[index - 1].classList.add("active");
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  }
}
prevBtn.addEventListener("click", () => {
  let activeIndex = document
    .querySelector(".active")
    .querySelector("a").textContent;
  handleChangePage(parseInt(activeIndex) - 1);
});
nextBtn.addEventListener("click", (e) => {
  let activeIndex = document
    .querySelector(".active")
    .querySelector("a").textContent;
  let finalIndex = document.querySelectorAll(".page-item").length;
  console.log(finalIndex);
  handleChangePage(parseInt(activeIndex) + 1);
});
