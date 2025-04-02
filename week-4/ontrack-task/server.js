const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

let items = [
  {
    name: "Laptop",
    description: "A high-end laptop for trading.",
    details: "Brand: Dell XPS 13, Core i7, 16GB RAM, 512GB SSD.",
    image: "images/laptop.jpg",
  },
  {
    name: "Bicycle",
    description: "Mountain bike available for exchange.",
    details: "Model: Giant Talon 1, 27.5-inch wheels, 18-speed.",
    image: "images/bicycle.jpg",
  },
  {
    name: "Guitar",
    description: "Acoustic guitar in great condition.",
    details: "Yamaha F310, Steel Strings, Excellent Sound.",
    image: "images/guitar.jpg",
  },
];

app.get("/api/items", (req, res) => {
  res.json({ statusCode: 200, data: items, message: "Success" });
});

app.post("/api/add-item", (req, res) => {
  items.push(req.body);
  res.json({ message: "Item added successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
