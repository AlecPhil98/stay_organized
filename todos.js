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
    console.log(userData)
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

let usersTask = (event)=>{

}