import { getUser } from '../services/user.js'
import { getRepositories, getEvents } from '../services/repositories.js'
import { user } from '../objects/user.js'
import { screen } from '../objects/screen.js'

function validateEmptyInput(userName)
{
    if(userName.length === 0)
    {
        alert("Preencha o campo com o nome do usuário do GitHub")
        return true
    }
}

document.getElementById("btn-search").addEventListener("click", () => {

    const nameUser = document.getElementById("input-search").value
    if(validateEmptyInput(nameUser)) return
    getUserData(nameUser)

})

document.getElementById("input-search").addEventListener("keyup", (e) => {

    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }

})

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found")
    {
        screen.renderNotFound()
        return
    }

    const eventsResponse = await getEvents(userName)

    //console.log(eventsResponse)

    const repositoriesResponse= await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    //console.log(repositoriesResponse)

    screen.renderUser(user)
}




