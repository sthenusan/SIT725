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
    await newItem.save();
    res.json({ message: "Item added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
};
