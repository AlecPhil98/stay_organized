"use strict";

window.onload = () => {
  urlData();
  let userDataForm = document.querySelector("#userDataForm");
  userDataForm.addEventListener("submit", (event)=>{completeOrUncomplete(event,true)});
  let resetTaskButton = document.querySelector("#resetTaskButton");
  resetTaskButton.addEventListener("click", (event)=>{completeOrUncomplete(event,false)});
};

// created a function called urlData that get's the url id and displays data that is associated with that id
let urlData = async () => {
  let userTableBodyInfo = document.querySelector("#userTableBodyInfo");
//   looking for what comes after the = in the url
  let urlParams = new URLSearchParams(location.search);
  userTableBodyInfo.innerHTML = "";
  if (urlParams.has("id") === true) {
    let  id = urlParams.get("id");

    try {
      let response = await fetch("http://localhost:8083/api/todos/" + id);
      let userTasksData = await response.json();
    //   created row and cell for that users data
      let row = userTableBodyInfo.insertRow();
      creatingRowAndCell(row,userTasksData,'category')
      creatingRowAndCell(row,userTasksData,'description')
      creatingRowAndCell(row,userTasksData,'deadline')
      creatingRowAndCell(row,userTasksData,'priority')
      creatingRowAndCell(row,userTasksData,'completed')
    } catch (error) {
      console.log("oops", error);
    }
  }
};
let creatingRowAndCell = (row,userTasksData,key)=>{
  let newCell = row.insertCell();
  newCell.innerHTML = userTasksData[key]
    //   made a condition if the completed key is false or true show and change completion icon corresponding if the user completed the task or not
  if (userTasksData[key] === true) {
    newCell.innerHTML = `<div>&#x2705;</div>`;
  }
  if (userTasksData[key] === false) {
    newCell.innerHTML = `<div> &#x274C;</div>`;
  }
}

// created a function called resetTasks that updates the body in the api of the value of the completed key to false if reset button is clicked
let completeOrUncomplete = async (event,boolean) => {
  event.preventDefault();
  //   looking for what comes after the = in the url
  let urlParams = new URLSearchParams(location.search);
  if (urlParams.has("id") === true) {
    let id = urlParams.get("id");

  try {
    let response = await fetch("http://localhost:8083/api/todos/" + id, {
         // changing the method to update the value of the completed key to false if mreset button is clicked
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        completed: boolean,
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

