const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", itemRoutes);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/myAppData");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

// Instead of app.listen(), export app for testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
