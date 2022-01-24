const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`); //서버로의 연결을 말한다.

function makeMessage(type, payload){
    const msg = { type, payload };
    return JSON.stringify(msg);
}


socket.addEventListener("open", () => { //브라우저에 접속이 되면 서버쪽에 알려준다.
    console.log("Connected to Server"); 
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li"); //message.data를 li안에 넣어준다.
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => { //브라우저에서 접속이 끊기면 서버쪽에 알려주게 된다.
    console.log("DisConnected from Server");
});



function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}




messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);