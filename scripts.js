let userName = prompt("Bem vindo! Insira o seu nome aqui:");
let avatar = {};
let messagesList = [];
let messagesListDisplay = document.querySelector(".subject");
sendName();
logIn();
function sendName () {
    avatar = {
        name: userName
    };
}
function failed (){
    userName = prompt("Ops! Nome já utilizado. Informe um novo nome:");
    sendName();
    logIn ();
}
function loggedIn () {
    setInterval(stayLoggedIn, 4000);
    setInterval(getMessages, 3000);
}
function logIn () {
const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', avatar);
requisicao.then(loggedIn);
requisicao.catch(failed);
}
function stayLoggedIn () {
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status' , avatar);
    requisicao.catch(numfoi);
}
function loadMessages (response) {
    messagesList = response.data;
    mountMessages();
}
function getMessages () {
    const requisicao = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages' , avatar);
    requisicao.then(loadMessages);
}
function mountMessages () {
    //o lele usou um querySelector("classe tipo :last-child")
    messagesListDisplay.innerHTML ="";
    for (let i=0;i<messagesList.length;i++){
        if (messagesList[i].type=="private_message") {
            if (messagesList[i].to==userName || messagesList[i].from==userName) {
                if (i == (messagesList.length - 1)) {
                    messagesListDisplay.innerHTML += `
                    <div class="messageBody ${messagesList[i].type} last">
                        <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span>reservadamente para <span class="name">Você </span><span>${messagesList[i].text}</span></p>
                    </div>`;    
                } else {
                messagesListDisplay.innerHTML += `
                <div class="messageBody ${messagesList[i].type}">
                <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span>reservadamente para <span class="name">Você </span><span>${messagesList[i].text}</span></p>
                </div>`;
                }    
            }
        } else { 
            if (messagesList[i].type=="message"){
                if (i == (messagesList.length - 1)) {
                    messagesListDisplay.innerHTML += `
                    <div class="messageBody ${messagesList[i].type} last">
                        <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span>para <span class="name">Todos </span><span>${messagesList[i].text}</span></p>
                    </div>`;    
                } else {
                messagesListDisplay.innerHTML += `
                <div class="messageBody ${messagesList[i].type}">
                <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span>para <span class="name">Todos </span><span>${messagesList[i].text}</span></p>
                </div>`;
                }    
            } else {
                if (i == (messagesList.length - 1)) {
                    messagesListDisplay.innerHTML += `
                    <div class="messageBody ${messagesList[i].type} last">
                        <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span><span>${messagesList[i].text}</span></p>
                    </div>`;    
                } else {
                messagesListDisplay.innerHTML += `
                <div class="messageBody ${messagesList[i].type}">
                    <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span><span>${messagesList[i].text}</span></p>
                </div>`;
                }
            }
        }
    }
    document.querySelector(".last").scrollIntoView();
}  
function mountMessage () {
    let userInput = document.querySelector("textarea").value;
    if (userInput==""){
        document.querySelector("textarea").value = "Escreva aqui...";
    } else { 
        let message = {
            from: userName,
            to: "Todos",
            text: userInput,
            type: "message"
        };
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
        requisicao.then(foi);
        requisicao.catch(numfoi);
        getMessages();
        document.querySelector("textarea").value = "Escreva aqui...";
    }
    document.querySelector("textarea").classList.remove("selected");
}
function foi () {
}
function numfoi () {
    window.location.reload()
}
function clearContent (object) {
    if (object.classList.contains("selected")){

    } else {
    document.querySelector("textarea").value = "";
    object.classList.add("selected")
    }
}