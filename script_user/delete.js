const deleteBtn = document.querySelector(".btnDelete");

function deleteUser(id) {
  let text = "Are you sure you want to delete this user\nEither OK or Cancel.";
  if (confirm(text) == true) {
    fetch("https://onlinequiz-app-ver1.herokuapp.com/api/user/" + id, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(bodyConvert) // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.querySelector(`td[title="${id}"]`).parentElement.remove();
      })
      .catch((error) => console.log(error));
  } else {
    return;
  }
}
