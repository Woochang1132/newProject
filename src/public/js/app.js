const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  myCamStream.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgform = room.querySelector("#msg");
  const nameform = room.querySelector("#name");
  msgform.addEventListener("submit", handleMessageSubmit);
  nameform.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if(rooms.length === 0){
    return;
  }
  rooms.forEach(room => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

//----------------------------------------------------
const myCamStream = document.getElementById("myStream");
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

myCamStream.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}


async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
    await getCameras();
  } catch (e) {
    console.log(e);
  }
}

getMedia();

function handleMuteClick() {
  myStream
  .getAudioTracks()
  .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream
  .getVideoTracks()
  .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);


	// 좌우반전
	$("#check01").change(function() {
		if($("#check01").is(":checked")) {
			myFace.style.transform = "scaleX(-1)";
		} else {
			myFace.style.transform = "";
		}
	});



  const enterFullscreenBtn = document.querySelector('.enterFullscreenBtn')
const exitFullscreenBtn = document.querySelector('.exitFullscreenBtn')
const toggleFullscreenBtn = document.querySelector('.toggleFullscreenBtn')

const container = document.querySelector('.container')

enterFullscreenBtn.addEventListener('click', e => {
  fullscreen(myFace)
})

exitFullscreenBtn.addEventListener('click', e => {
  exitFullScreen()
})

toggleFullscreenBtn.addEventListener('click', e => {
  toggleFullScreen(myFace)
})

const fullscreen = element => {
  if (element.requestFullscreen) return element.requestFullscreen()
  if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
  if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
  if (element.msRequestFullscreen) return element.msRequestFullscreen()
}

const exitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen()
  if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen()
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  if (document.msExitFullscreen) return document.msExitFullscreen()
}

function toggleFullScreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) return element.requestFullscreen()
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen()
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    if (element.msRequestFullscreen) return element.msRequestFullscreen()
  } else {
    if (document.exitFullscreen) return document.exitFullscreen()
    if (document.webkitCancelFullscreen)
      return document.webkitCancelFullscreen()
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
    if (document.msExitFullscreen) return document.msExitFullscreen()
  }
}