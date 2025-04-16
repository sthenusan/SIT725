const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/myAppData", {});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  details: String,
  image: String,
});
const Items = mongoose.model("Items", ItemSchema);

app.get("/api/items", async (req, res) => {
  const items = await Items.find({});
  res.json({ statusCode: 200, data: items, message: "Success" });
});

app.post("/api/add-item", (req, res) => {
  items.push(req.body);
  res.json({ message: "Item added successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
