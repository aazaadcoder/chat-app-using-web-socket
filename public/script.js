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

function addMessageBox(message, messageType) {
  const messageBox = document.createElement("li");
  messageBox.classList.add(messageType);
  messageBox.textContent = message;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight);
}
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
    addMessageBox(input.value, "self-text");
      const messageData = {
        message: input.value,
        authorId: socket.id,
        nickName: nickName,
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
      addMessageBox(
        `${messageData.nickName}: ${messageData.message}`,
        "normal-text"
      );
    }
  
});

socket.on("connected-user-nick-name", (connectedUserNickName) => {
  if (nickName) {
    addMessageBox(`${connectedUserNickName} has joined the Chat`, "joined");
  }
});

socket.on("disconnected-user-nick-name", (disConnectedUserNickName) => {
  if (nickName) {
    addMessageBox(`${disConnectedUserNickName} has left the Chat`, "left");
  }
});
