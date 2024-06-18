"use strict";

window.onload = () => {
  // called listingUsersOnDropdown function to create a dropdown with the user's names
  listingUsersOnDropdown();

  let userTable = document.querySelector('#userTable')
  userTable.style.display = "none";
  let usersDropdown = document.querySelector("#usersDropdown");
  usersDropdown.addEventListener("change", usersTask);
};

let listingUsersOnDropdown = async () => {
  let usersDropdown = document.querySelector("#usersDropdown");
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select User";
  usersDropdown.appendChild(defaultOption);
  // get all users and add each user to the dropdown
  try {
    let response = await fetch("http://localhost:8083/api/users");
    let userData = await response.json();
    for (let i = 0; i < userData.length; i++) {
      let userOption = document.createElement("option");
      userOption.value = userData[i].id;
      userOption.textContent = userData[i].name;
      usersDropdown.appendChild(userOption);
    }
  } catch (error) {
    console.log("oops", error);
  }
};
// created usersTask function that displays user's todo tasks
let usersTask = async (event) => {
  let userTableBodyInfo = document.querySelector("#userTableBodyInfo");
  let userTable = document.querySelector('#userTable')
  let userId = event.target.value;
  if (userId === "") {
    userTable.style.display = "none";
  } else {
   userTableBodyInfo.innerHTML = ''
    userTable.style.display = "block";
  }
    
  try {
    let response = await fetch("http://localhost:8083/api/todos/byuser/" + userId);
    let userTasks = await response.json();
    // creating a row and cell for selected user's data
    if(userTasks.length === 0){
      let newRow = userTableBodyInfo.insertRow()
      let newCell1 = newRow.insertCell()
      newCell1.innerHTML =  'No tasks'
      let newCell2 = newRow.insertCell()
      newCell2.innerHTML =  'No deadline'
    }
    for(let i = 0;i<userTasks.length;i++){

      let newRow = userTableBodyInfo.insertRow()
      let newCell1 = newRow.insertCell()
      newCell1.innerHTML =  userTasks[i].description
      let newCell2 = newRow.insertCell()
      newCell2.innerHTML =  userTasks[i].deadline
      let newCell3 = newRow.insertCell()
      newCell3.innerHTML =  `<a href='./todo_details.html?id=${userId}'>See Details</a>`
    }
    
  } catch (error) {
    console.log("oops", error);
  }
};
