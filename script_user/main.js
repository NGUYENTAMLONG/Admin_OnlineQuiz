const table = document.querySelector("#myTable");
const total = document.querySelector(".totalSpan");
fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user")
  .then((res) => res.json())
  .then((data) => {
    total.innerHTML = data.length;
    let htmls = data.map((user, index) => {
      return `<tr id="${user._id}">
      <td id="td_index">${index + 1}</td>
      <td title="${user._id}">
        <div class="overflow-auto" style="width:100px">${user._id}</div>
        </td>
      <td id="td_username">${user.username}</td>
      <td id="td_email">${user.email}</td>
      <td class="d-flex" title="${user.password}" id="td_password">
        <div class="overflow-auto" style="width:150px">${user.password}
            </div>
      </td>
      <td id="td_phonenumber">${user.phonenumber}</td>
      <td>${user.createdAt}</td>
      <td>${user.updatedAt}</td>
       <td class="text-center" id="td_setting"><button class="btn btn-primary btnUpdate" title="Update" onClick="updateUser('${
         user._id
       }')"><i class="fas fa-edit"></i> </button>
         <button class="btn btn-danger btnDelete" title="Delete" onClick="deleteUser('${
           user._id
         }')"><i class="far fa-trash-alt"></i></button>
       </td>
    </tr>`;
    });
    table.innerHTML = htmls.join("");
  })
  .catch((error) => console.log(error));
