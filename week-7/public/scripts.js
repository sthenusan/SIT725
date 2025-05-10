const socket = io();

// Handle receiving a number
socket.on("number", (msg) => {
  const time = new Date().toLocaleTimeString();
  document.getElementById("number").innerText = `${msg} (received at ${time})`;
  console.log("Received number:", msg);
});

// Handle user count update
socket.on("user-count", (count) => {
  document.getElementById("users").innerText = `Users online: ${count}`;
});

// Emit a request for a new number
function requestNumber() {
  socket.emit("request-number");
}
