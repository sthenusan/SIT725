const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`✅ New client connected: ${socket.id}`);
  console.log(`👥 Total clients: ${io.engine.clientsCount}`);

  // Notify all clients of the updated user count
  io.emit("user-count", io.engine.clientsCount);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
    console.log(`👥 Total clients: ${io.engine.clientsCount}`);
    io.emit("user-count", io.engine.clientsCount);
  });

  // Handle "request-number" event
  socket.on("request-number", () => {
    const num = Math.floor(Math.random() * 100);
    console.log(`🔁 Number requested by ${socket.id} → ${num}`);
    io.emit("number", num); // broadcast to all clients
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
