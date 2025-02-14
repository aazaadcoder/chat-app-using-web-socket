const socket = io();

const allMessages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("user-message", input.value);
    input.value = "";
  }
})

socket.on("message", (message) => {
  const messageBox = document.createElement("li");
  messageBox.textContent = message;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight)


})

socket.on("connected-user-id", (connectedUserId) => {
  const messageBox = document.createElement("li");
  messageBox.classList.add("joined");
  messageBox.textContent = `User: ${connectedUserId} has joined the Chat`;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight);

})

socket.on("disconnected-user-id", (disConnectedUserId) => {
  const messageBox = document.createElement("li");
  messageBox.classList.add("left");
  messageBox.textContent = `User: ${disConnectedUserId} has left the Chat`;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight);

})