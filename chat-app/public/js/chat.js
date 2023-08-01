const socket = io();

const $formInput = document.querySelector("input");
const $formButton = document.querySelector("button");
const $messageForm = document.querySelector("#msgForm");
const $sendLocationBtn = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

//templates
const $messageTemplate = document.querySelector("#message-template").innerHTML;
const $locationTemplate =
  document.querySelector("#location-template").innerHTML;
const $sideBarTemplate = document.querySelector("#sideBar-template").innerHTML;

//options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  console.log("Scroll1")
  //get new message
  const $newMessage = $messages.lastElementChild;

  //get new message height
  const newMessageStyle = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  //visible height
  const visibleHeight = $messages.offsetHeight;

  //height of message container
  const containerHeight = $messages.scrollHeight;

  //how far have i scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if(containerHeight-newMessageHeight <= scrollOffset){
    console.log("Scroll2")
    $messages.scrollTop = $messages.scrollHeight;
  }

};

//On form Submit
$messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  $formButton.setAttribute("disabled", "disabled");
  let message = event.target.elements.message.value;
  //let message= document.querySelector('input').value;

  socket.emit("sendMessage", message, (error, message) => {
    $formButton.removeAttribute("disabled");
    $formInput.value = "";
    $formInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log(`Message was ${message}`);
  });
});

socket.on("message", (message) => {
  const html = Mustache.render($messageTemplate, {
    username: message.username,
    message: message.text, //Mustache library for rendering HTML
    createdAt: moment(message.createdAt).format("h:mm a"), //moment library for formatting time
  });
  console.log(html);
  $messages.insertAdjacentHTML("beforeend", html);
  console.log(message);
  autoscroll()
});

// socket.on("message", (message) => {
//   console.log(message)
//   console.log(message.message,message.timeStamp);
// });

socket.on("locationMessage", (message) => {
  const html = Mustache.render($locationTemplate, {
    username: message.username,
    url: message.urlLink,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  //console.log("html", html, url);
  $messages.insertAdjacentHTML("beforeend", html);
  //console.log(url);
  autoscroll()
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render($sideBarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

$sendLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  $sendLocationBtn.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit(
      "send-location",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $sendLocationBtn.removeAttribute("disabled");
        console.log("location shared");
      }
    );
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

//recieve location from server
//socket.on('message')

// socket.on('countUpdated',(count)=>{
//     console.log("Count is updated",count);
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     socket.emit('increment')
// })
