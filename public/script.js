const socket = io();
let nickName = "";
const allMessages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const nickNameButton = document.getElementById("nickNameButton");
const nickNameInput = document.getElementById("nickNameInput");
const nickNameContainer = document.getElementsByClassName("nickNameContainer")[0];
const nickNameDisplay = document.getElementById("nickName");




nickNameButton.addEventListener("click", (e)=>{
    e.preventDefault();
    if(nickNameInput.value){
        nickName = nickNameInput.value;
        socket.emit("connected-user-nick-name" , nickName);
        nickNameContainer.style.display = "none";
        nickNameDisplay.innerText = `${nickName}:`;
        window.scrollTo(0, document.body.scrollHeight)

    }
    else{
        alert("Nickname Required to Enter the Chat.")
    }
})

    
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if(nickName){
        if (input.value) {
            socket.emit("user-message", input.value);
            input.value = "";
          }
    }
    else{
        alert("Nickname Required to Enter the Chat.")

    }
  })

  
socket.on("message", (message) => {
  if(nickName){
    const messageBox = document.createElement("li");
  messageBox.textContent = message;
  messageBox.classList.add("normal-text");
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight)
  }


})

socket.on("connected-user-nick-name", (connectedUserNickName) => {
  if(nickName){
    const messageBox = document.createElement("li");
  messageBox.classList.add("joined");
  messageBox.textContent = `${connectedUserNickName} has joined the Chat`;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight);
  }

})

socket.on("disconnected-user-nick-name", (disConnectedUserNickName) => {
  if(nickName){
    const messageBox = document.createElement("li");
  messageBox.classList.add("left");
  messageBox.textContent = `${disConnectedUserNickName} has left the Chat`;
  allMessages.appendChild(messageBox);
  window.scrollTo(0, document.body.scrollHeight);

  }
})

