const searchInput = document.querySelector("#myInput");
const tbodyTable = document.querySelector("#myTable");
const getAllBtn = document.querySelector(".getAll");
getAllBtn.onclick = () => {
  //   location.reload(); //cach1:
  // cach2:
  searchInput.value = "";
  $(".btn-outline-info").click();
};
$(document).ready(function () {
  $("#myInput").on("keyup", function (e) {
    if (e.keyCode === 13) {
      handleSearch();
    }
  });
  $(".btn-outline-info").on("click", () => {
    handleSearch();
  });
});
function handleSearch() {
  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user")
    .then((res) => res.json())
    .then((data) => {
      renderAllUsers(data);
      var value = $("#myInput").val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    })
    .catch((error) => console.log(error));
}
function renderAllUsers(result) {
  let htmls = result.map((user, index) => {
    return `
      <tr>
      <td>${index + 1}</td>
      <td title="${user._id}">
        <div class="overflow-auto" style="width:100px">${user._id}</div>
        </td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td class="d-flex" title="${user.password}">
        <div class="overflow-auto" style="width:150px">${user.password}
            </div><i class="fas fa-eye"></i>
      </td>
      <td>${user.phonenumber}</td>
      <td>${user.createdAt}</td>
      <td>${user.updatedAt}</td>
       <td class="text-center"><button class="btn btn-primary btnUpdate" title="Update" onClick="updateQuestion(this,'${
         user._id
       }')"><i class="fas fa-edit"></i> </button>
         <button class="btn btn-danger btnDelete" title="Delete" onClick="deleteQuestion(this,'${
           user._id
         }')"><i class="far fa-trash-alt"></i></button>
       </td>
    </tr>
       `;
  });
  document.querySelector("tbody").innerHTML = htmls.join("");
}
