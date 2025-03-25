const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/add-item", (req, res) => {
  items.push(req.body);
  res.json({ message: "Item added successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
