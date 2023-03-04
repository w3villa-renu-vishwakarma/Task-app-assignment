let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
       
  if (textInput.value.trim() === "" || dateInput.value === "" || textarea.value.trim() === "") {
    console.log("failure");
    alert("Please fill all fields")
  } 
    else {
    console.log("success");
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let array = [{}];

let acceptData = () => {
  array.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("array", JSON.stringify(array));

  console.log(array);
  createTasks();
};

let createTasks = () => {
    document.getElementById("add").innerHTML= `Add`;
  tasks.innerHTML = "";
  array.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <button onClick= "edit(this)" data-bs-toggle="modal" data-bs-target="#form" class="btn btn-secondary"> Edit</button>
            <button onClick ="deleteTask(this);createTasks()" class="btn btn-secondary"> Delete</button>
          </span>
        </div>
    `);
  });

  resetForm();

};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  array.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("array", JSON.stringify(array));
  console.log(array);
  
};

let edit = (e) => {
    document.getElementById("exampleModalLabel").innerHTML = `Edit Your Task`
    document.getElementById("add").innerHTML = `edit task`;


  let selectedTask = e.parentElement.parentElement;


  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  delete(e);
  
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  array = JSON.parse(localStorage.getItem("array")) || []
  console.log(data);
  createTasks();
})();