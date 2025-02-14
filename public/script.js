const socket = io();
let nickName = "";
const allMessages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const nickNameButton = document.getElementById("nickNameButton");
const nickNameInput = document.getElementById("nickNameInput");
const nickNameContainer =
  document.getElementsByClassName("nickNameContainer")[0];
const nickNameDisplay = document.getElementById("nickName");

nickNameButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (nickNameInput.value) {
    nickName = nickNameInput.value;
    socket.emit("connected-user-nick-name", nickName);
    nickNameContainer.style.display = "none";
    nickNameDisplay.innerText = `${nickName}:`;
    window.scrollTo(0, document.body.scrollHeight);
  } else {
    alert("Nickname Required to Enter the Chat.");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (nickName) {
    if (input.value) {
      const messageData = {
        message: input.value,
        authorId: socket.id,
        nickName : nickName
      };
      socket.emit("user-message-data", messageData);
      input.value = "";
    }
  } else {
    alert("Nickname Required to Enter the Chat.");
  }
});

socket.on("message-data", (messageData) => {
  if (nickName) {
    const messageBox = document.createElement("li");
    if(messageData.authorId == socket.id){
        messageBox.textContent = messageData.message;

        messageBox.classList.add("self-text");
    }
    else{
        messageBox.textContent = `${messageData.nickName}: ${messageData.message}`;

        messageBox.classList.add("normal-text");
    }
    allMessages.appendChild(messageBox);
    window.scrollTo(0, document.body.scrollHeight);
  }
});

socket.on("connected-user-nick-name", (connectedUserNickName) => {
  if (nickName) {
    const messageBox = document.createElement("li");
    messageBox.classList.add("joined");
    messageBox.textContent = `${connectedUserNickName} has joined the Chat`;
    allMessages.appendChild(messageBox);
    window.scrollTo(0, document.body.scrollHeight);
  }
});

socket.on("disconnected-user-nick-name", (disConnectedUserNickName) => {
  if (nickName) {
    const messageBox = document.createElement("li");
    messageBox.classList.add("left");
    messageBox.textContent = `${disConnectedUserNickName} has left the Chat`;
    allMessages.appendChild(messageBox);
    window.scrollTo(0, document.body.scrollHeight);
  }
});
