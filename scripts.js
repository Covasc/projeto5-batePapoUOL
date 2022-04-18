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
    console.log("falhou");
    userName = prompt("Ops! Nome já utilizado. Informe um novo nome:");
    sendName();
    console.log(avatar);
    logIn ();
}
function loggedIn () {
    console.log("deu certo");
    setInterval(stayLoggedIn, 4000)
    getMessages();
}
function logIn () {
const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', avatar);
requisicao.then(loggedIn);
requisicao.catch(failed);
}
function stayLoggedIn () {
    console.log("logando")
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status' , avatar);
}
function loadMessages (response) {
    messagesList = response.data;
    console.log(messagesList);
    mountMessages();
}
function getMessages () {
    const requisicao = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages' , avatar);
    requisicao.then(loadMessages);
}
function mountMessages () {
    for (let i=0;i<messagesList.length;i++){
        messagesListDisplay.innerHTML += `
        <div class="messageBody ${messagesList[i].type}">
            <p><span class="time">(${messagesList[i].time}) </span><span class="name">${messagesList[i].from} </span><span>${messagesList[i].text}</span></p>
        </div>`;
    }
}

