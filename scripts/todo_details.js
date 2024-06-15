"use strict";

window.onload = () => {
  urlData();
  let userDataForm = document.querySelector("#userDataForm");
  userDataForm.addEventListener("submit", completeTasks);
  let resetTaskButton = document.querySelector("#resetTaskButton");
  resetTaskButton.addEventListener("click", resetTasks);
};

// created a function called urlData that get's the url id and displays data that is associated with that id
let urlData = async () => {
  let userTableBodyInfo = document.querySelector("#userTableBodyInfo");
//   looking for what comes after the = in the url
  let urlParams = new URLSearchParams(location.search);
  userTableBodyInfo.innerHTML = "";
  let id = -1;
  if (urlParams.has("id") === true) {
    id = urlParams.get("id");

    try {
      let response = await fetch("http://localhost:8083/api/todos/" + id);
      let userTasksData = await response.json();
    //   created row and cell for that users data
      let newRow = userTableBodyInfo.insertRow();
      let newCell1 = newRow.insertCell();
      let newCell2 = newRow.insertCell();
      let newCell3 = newRow.insertCell();
      let newCell4 = newRow.insertCell();
      let newCell5 = newRow.insertCell();
      newCell1.innerHTML = userTasksData.category;
      newCell2.innerHTML = userTasksData.description;
      newCell3.innerHTML = userTasksData.deadline;
      newCell4.innerHTML = userTasksData.priority;
    //   made a condition if the completed key is false or true show and change completion icon corresponding if the user completed the task or not
      if (userTasksData.completed === false) {
        newCell5.innerHTML = `<div> &#x274C;</div>`;
      }
      if (userTasksData.completed === true) {
        newCell5.innerHTML = `<div>&#x2705;</div>`;
      }
    } catch (error) {
      console.log("oops", error);
    }
  }
};

// created a function called completeTasks that updates the body in the api of the value of the completed key to true if mark completed button is submited
let completeTasks = async (event) => {
  event.preventDefault();
  //   looking for what comes after the = in the url
  let urlParams = new URLSearchParams(location.search);
  let id = -1;
  if (urlParams.has("id") === true) {
    id = urlParams.get("id");

  try {
    let response = await fetch("http://localhost:8083/api/todos/" + id, {
        // changing the method to update the value of the completed key to true if mark completed button is clicked
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        completed: true,
      }),
    });
    let updatedCompletion = await response.json();
    console.log(updatedCompletion)

    // running the urlData function to reload the updated api data
    urlData();
  } catch (error) {
    console.log("Uh-oh", error);
    }
}
}

// created a function called resetTasks that updates the body in the api of the value of the completed key to false if reset button is clicked
let resetTasks = async (event) => {
  event.preventDefault();
  //   looking for what comes after the = in the url
  let urlParams = new URLSearchParams(location.search);
  let id = -1;
  if (urlParams.has("id") === true) {
    id = urlParams.get("id");
    
  try {
    let response = await fetch("http://localhost:8083/api/todos/" + id, {
         // changing the method to update the value of the completed key to false if mreset button is clicked
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        completed: false,
      }),
    });
    let updatedCompletion = await response.json();
    console.log(updatedCompletion)

     // running the urlData function to reload the updated api data
    urlData();
  } catch (error) {
    console.log("Uh-oh", error);
  }
}
}

