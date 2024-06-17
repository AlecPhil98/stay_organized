"use strict"

window.onload = () => {

    userNamesDropdown()

    pickCategoryDropdown()

    taskPriorityDropdown()

    const addTodoForm = document.querySelector("#addTodoForm");

    addTodoForm.addEventListener("submit", addTodo)

}



let userNamesDropdown = async () => {

    // grabs the where to put the data
    let userNames = document.querySelector("#userNames")

    // lets there be a default option 
    let defaultOption = document.createElement('option')
    defaultOption.value = ""
    defaultOption.textContent = 'Select User'
    userNames.appendChild(defaultOption)

    // fetches the data from the api and appends to the select tag
    try {
        let response = await fetch("http://localhost:8083/api/users")
        let userData = await response.json()
        for (let i = 0; i < userData.length; i++) {
            let userOption = document.createElement("option")
            userOption.value = userData[i].id
            userOption.textContent = userData[i].name
            userNames.appendChild(userOption)
        }
    } catch (error) {
        console.log("Uh oh spaghetti oh", error)
    }
}


let pickCategoryDropdown = async () => {

    // grabs the where to put the data
    let pickCategory = document.querySelector("#pickCategory")

    // lets there be a default option 
    let defaultOption = document.createElement('option')
    defaultOption.value = ""
    defaultOption.textContent = "Select Category"
    pickCategory.appendChild(defaultOption)

    try {
        let response = await fetch("http://localhost:8083/api/categories")
        let categoryData = await response.json()
        for (let i = 0; i < categoryData.length; i++) {
            let categoryOption = document.createElement("option")
            categoryOption.value = categoryData[i].id
            categoryOption.textContent = categoryData[i].name
            pickCategory.appendChild(categoryOption)
        }
    } catch (error) {
        console.log("Uh oh spaghetti oh", error)
    }


}

let taskPriorityDropdown = () => {




}