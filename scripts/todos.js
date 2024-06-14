'use strict'

window.onload = ()=>{
    // called listingUsersOnDropdown function to create a dropdown with the user's names
    listingUsersOnDropdown()
    
    let usersDropdown = document.querySelector('#usersDropdown')
    usersDropdown.addEventListener('change', usersTask)
}

let listingUsersOnDropdown = async()=>{
let usersDropdown = document.querySelector('#usersDropdown')
let defaultOption = document.createElement('option')
defaultOption.value = ''
defaultOption.textContent = 'Select User'
usersDropdown.appendChild(defaultOption)
// get all users and add each user to the dropdown
try{
    let response = await fetch("http://localhost:8083/api/users")
    let userData = await response.json()
    for(let i =0; i<userData.length;i++){
        let userOption=document.createElement('option')
        userOption.value = userData[i].id
        userOption.textContent = userData[i].name
        usersDropdown.appendChild(userOption)
    }
    }catch(error){
        console.log('oops',error)
    }
}
// created usersTask function that displays user's todo tasks
let usersTask = async (event)=>{
let displayUserTasks = document.querySelector('#UserTask')
let userId = event.target.value
if(userId === ''){
    displayUserTasks.style.display = 'none'
}else{
    displayUserTasks.style.display = 'block'
}
try{
    let response = await fetch("http://localhost:8083/api/todos/"+userId)
    let userTasks = await response.json()
   
    if(userTasks.completed === false){
        displayUserTasks.innerHTML = `
    <div><b>To Do's:</b> ${userTasks.description}</div>
    <div><b>Deadline:</b> ${userTasks.deadline}</div>
    <div><b>Priority: </b>${userTasks.priority}</div>
    <div><b>Completed:</b> &#x274C;</div>
    `
    }
    if(userTasks.completed === true){
        displayUserTasks.innerHTML = `
    <div><b>To Do's:</b> ${userTasks.description}</div>
    <div><b>Deadline:</b> ${userTasks.deadline}</div>
    <div><b>Priority: </b>${userTasks.priority}</div>
    <div><b>Completed:</b> &#x2705;</div>
    `
    }
    }catch(error){
        console.log('oops',error)
    }
}