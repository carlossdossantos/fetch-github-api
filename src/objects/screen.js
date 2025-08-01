const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        
        this.userProfile.innerHTML = `<div class="info">
                      <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                          <div class="data">
                              <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                              <h2>${user.userName ?? 'Não possui login cadastrado 😓'}</h2>
                              <p>${user.bio ?? 'Não possui bio cadastrada 😓'}</p>
                              <p>👤Seguindo: ${user.seguindo ?? '0'}</p>
                              <p>👥Seguidores: ${user.seguidores ?? '0'}</p>
                          </div>
                    </div>`  

                    //console.log(user)

        let eventsItens = ''
        user.events.forEach((event) => {
            let typeEvents;
    if (event.type === "PushEvent") {
        // Substitui \n por <br> se quiser que a quebra de linha apareça visualmente
        typeEvents = `<div><strong><span class="weight-event">${event.repo.name}</span></strong> - ${event.payload.commits[0].message}</div>`;
    } else {
        // Substitui \n por <br> se quiser que a quebra de linha apareça visualmente
        typeEvents = `<div><strong><span class="weight-event">${event.repo.name}</span></strong></div>`;
    }
            eventsItens += `${typeEvents}`

        })

        let repositoriesItens = ''
        user.repositories.forEach( repo => repositoriesItens += `<li>
        <a target="_blank" href="${repo.html_url}">${repo.name}<br>
            <p class="media-social">🍴${repo.forks_count}</p><p class="media-social">⭐${repo.stargazers_count}</p><p class="media-social">👀${repo.watchers}</p> <p class="media-social">🧑‍💻${repo.language}</p>
        </a>
        </li>`)

        if (user.events.length > 0)
        {
            this.userProfile.innerHTML += `<div class="repositories section">
                                               <h2>Eventos</h2>
                                               ${eventsItens}
                                           </div>`
        }

        if(user.repositories.length > 0)
        {
            this.userProfile.innerHTML += `<div class="repositories section">
                                               <h2>Repositórios</h2>
                                               <ul>${repositoriesItens}</ul>
                                           </div>`
        }
    },
   renderNotFound(){
           this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
   }
}

export { screen }