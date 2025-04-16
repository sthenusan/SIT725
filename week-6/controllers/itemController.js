const Item = require("../models/Item");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json({ statusCode: 200, data: items, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

exports.addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const { name, description, details, image } = req.body;

    // Simple validation check
    if (!name || !description || !details || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }
    await newItem.save();
    res.json({ message: "Item added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
};
