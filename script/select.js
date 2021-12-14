const selectCategory = document.querySelector(".selectCategory");
selectCategory.onchange = (e) => {
  const selectValue = e.target.value;
  if (selectValue === "All") {
    fetch("https://onlinequiz-app-ver1.herokuapp.com/api/question")
      .then((res) => res.json())
      .then((data) => {
        renderAllQuestions(data);
        document.querySelector(".paging").classList.add("d-none");
      })
      .catch((error) => console.log(error));
    document.querySelector(".totalInTopic").innerHTML = "";
  } else if (selectValue === "Paging") {
    location.reload();
  } else {
    fetch(
      "https://onlinequiz-app-ver1.herokuapp.com/api/question/" + selectValue
    )
      .then((res) => res.json())
      .then((data) => {
        renderAllQuestions(data);
        const total = data.length;
        document.querySelector(".paging").classList.add("d-none");
        document.querySelector(
          ".totalInTopic"
        ).innerHTML = `<b>The total number of questions of the topic is <span class="badge badge-warning">${total}</span></b>`;
      })
      .catch((error) => console.log(error));
  }
};
function renderAllQuestions(result) {
  let htmls = result.map((item, index) => {
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
