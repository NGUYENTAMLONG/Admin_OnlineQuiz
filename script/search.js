const searchInput = document.querySelector("#myInput");
const tbodyTable = document.querySelector("#myTable");
$(document).ready(function () {
  $("#myInput").on("keyup", function (e) {
    if (e.keyCode === 13) {
      handleSearch();
      document.querySelector(".totalInTopic").innerHTML = "";
    }
  });
  $(".btn-outline-info").on("click", () => {
    handleSearch();
    document.querySelector(".totalInTopic").innerHTML = "";
  });
});
function handleSearch() {
  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/question")
    .then((res) => res.json())
    .then((data) => {
      renderAllQuestions(data);
      var value = $("#myInput").val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    })
    .catch((error) => console.log(error));
  document.querySelector(".paging").classList.add("d-none");
}
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
