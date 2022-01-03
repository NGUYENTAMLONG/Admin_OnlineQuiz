const updateBtn = document.querySelector(".btnUpdate");

function updateUser(id) {
  // console.log(id);
  const td = document.getElementById(`${id}`);
  const tdUsername = td.querySelector("#td_username");
  const tdEmail = td.querySelector("#td_email");
  const tdPassword = td.querySelector("#td_password");
  const tdPhonenumber = td.querySelector("#td_phonenumber");
  const tdSetting = td.querySelector("#td_setting");
  const tdIndex = td.querySelector("#td_index");

  tdUsername.innerHTML = `<input type="text" class="form-control" id="username" required placeholder="Enter username" value="${tdUsername.innerHTML}" />`;
  tdEmail.innerHTML = `<input type="text" class="form-control" id="email" required placeholder="Enter email" value="${tdEmail.innerHTML}" />`;
  tdPassword.innerHTML = `<input type="text" class="form-control" id="password" required placeholder="Enter password" value="${tdPassword.textContent.trim()}" />`;
  tdPhonenumber.innerHTML = `<input type="text" class="form-control" id="phonenumber" placeholder="Enter phonenumber" value="${tdPhonenumber.innerHTML}" />`;
  tdSetting.innerHTML = `<button class="btn btn-success btnSubmitUpdate" onClick="submitUpdate('${id}')">Submit</button>
<button class="btn btn-warning btnCancel mt-2" onClick="cancelUpdate('${id}','${tdIndex.innerHTML}')">Cancel</button>`;
}

function submitUpdate(id) {
  const tr = document.getElementById(`${id}`);
  const tdUsername = tr.querySelector("#td_username");
  const tdEmail = tr.querySelector("#td_email");
  const tdPassword = tr.querySelector("#td_password");
  const tdPhonenumber = tr.querySelector("#td_phonenumber");
  const tdSetting = tr.querySelector("#td_setting");
  const bodyUpdate = {
    username: tdUsername.querySelector("input").value,
    email: tdEmail.querySelector("input").value,
    password: tdPassword.querySelector("input").value,
    phonenumber: tdPhonenumber.querySelector("input").value,
  };
  console.log(bodyUpdate);
  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyUpdate), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => console.log(error));
}

function cancelUpdate(id, index) {
  fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user/" + id)
    .then((res) => res.json())
    .then((user) => {
      let htmls = `<tr id="${user._id}">
      <td id="td_index">${index}</td>
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
     <td class="text-center" id="td_setting"><button class="btn btn-primary btnUpdate" title="Update" onClick="updateUser('${user._id}')"><i class="fas fa-edit"></i> </button>
       <button class="btn btn-danger btnDelete" title="Delete" onClick="deleteUser('${user._id}')"><i class="far fa-trash-alt"></i></button>
     </td>
   </tr>`;
      document.querySelector(`tr[id='${id}']`).innerHTML = htmls;
    })
    .catch((error) => console.log(error));
}
