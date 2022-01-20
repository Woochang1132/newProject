const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`); //서버로의 연결을 말한다.

socket.addEventListener("open", () => { //브라우저에 접속이 되면 서버쪽에 알려준다.
    console.log("Connected to Server"); 
});

socket.addEventListener("message", (message) => {
    console.log("New message :", message.data, "from the server" );
});

socket.addEventListener("close", () => { //브라우저에서 접속이 끊기면 서버쪽에 알려주게 된다.
    console.log("DisConnected from Server");
});



function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value);
}


messageForm.addEventListener("submit", handleSubmit);