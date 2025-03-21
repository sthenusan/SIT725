const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/getpage", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Both num1 and num2 must be valid numbers.");
  }

  const result = num1 + num2;
  res.json({ result: result });
});
