let todoData = [];

const todoSectionHTML = document.createElement("div");
const inputHTML = document.createElement("input");
const addBtnHTML = document.createElement("button");
const listSection = document.createElement("div");

todoSectionHTML.classList.add("add-todo-section");
inputHTML.classList.add("input-field");
addBtnHTML.classList.add("add-button");
listSection.classList.add("list-of-items");

addBtnHTML.textContent = "CREATE";

document.body.append(todoSectionHTML);
document.body.append(listSection);
todoSectionHTML.append(inputHTML);
todoSectionHTML.append(addBtnHTML);

addBtnHTML.addEventListener("click", () => {
  if (inputHTML.value) {
    const todo = {};
    todo.text = inputHTML.value;
    todo.id = Date.now();
    todoData.push(todo);
    writeOutTodoList(todoData);
    inputHTML.value = "";
  }
});

function writeOutTodoList(array) {
  listSection.innerHTML = "";
  array.forEach((todo) => {
    const containerHTML = document.createElement("div");
    const checkboxHTML = document.createElement("input");
    const textHTML = document.createElement("span");
    const deleteBtnHTML = document.createElement("button");

    checkboxHTML.type = "checkbox";
    checkboxHTML.classList.add("checkbox");
    containerHTML.classList.add("todo-container");
    textHTML.classList.add("todo-text");
    deleteBtnHTML.classList.add("delete-button");
    todo.check
      ? (containerHTML.style.backgroundColor = "#586a8a")
      : (containerHTML.style.backgroundColor = "#B2DB3D");

    checkboxHTML.checked=todo.check;

    textHTML.textContent = todo.text;
    deleteBtnHTML.textContent = "DELETE";
    deleteBtnHTML.setAttribute("id", todo.id);

    deleteBtnHTML.addEventListener("click", () => {
      todoData = todoData.filter(
        (element) => Number(element.id) != Number(deleteBtnHTML.id)
      );
      writeOutTodoList(todoData);
      writeOutDataToLocalStorage();
    });

    checkboxHTML.addEventListener("change", () => {
      if (!checkboxHTML.checked) {
        containerHTML.style.backgroundColor = "#B2DB3D";
        todo.check = false;
        writeOutDataToLocalStorage();
      } else {
        containerHTML.style.backgroundColor = "#586a8a";
        checkboxHTML.checked = true;
        todo.check = true;
        writeOutDataToLocalStorage();
      }
    });

    listSection.append(containerHTML);
    containerHTML.append(checkboxHTML);
    containerHTML.append(textHTML);
    containerHTML.append(deleteBtnHTML);
  });
  writeOutDataToLocalStorage();
}

function writeOutDataToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todoData));
}

function getDataFromLocalStorage() {
  if (localStorage.getItem("todos") === null) {
    return [];
  } else {
    todoData = JSON.parse(localStorage.getItem("todos"));
    writeOutTodoList(todoData);
  }
}

getDataFromLocalStorage();
