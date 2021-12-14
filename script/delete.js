function deleteQuestion(it, id) {
  if (confirm(`Are you sure you want to delete this question ?`)) {
    const deleteMethod = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(
      "https://onlinequiz-app-ver1.herokuapp.com/api/question/" + id,
      deleteMethod
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Deleted Successful ^^ !");
        it.parentElement.parentElement.remove();
      })

      .catch((err) => {
        console.log(err);
        alert("Something went wrong T-T !");
      });
  } else {
    return;
  }
}
