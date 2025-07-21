const key_table = require("../models/KeyTableModel");

const getkey = async (req, res) => {
  try {
    const key_data = await key_table.find();
    console.log("this is datat", key_data);
    res.status(200).json({ data: key_data });
  } catch (err) {
    res.status(500).json({ Message: "Server error" });
  }
};

const addkey = async (req, res) => {
  const { key, limit, name } = req.body;

  try {
    const keyExist = await key_table.findOne({ key });
    if (keyExist) return res.status(400).json({ msg: "Key already exists" });
    const newkey = new key_table({ name, key, limit });
    await newkey.save();
    res.status(201).json({ msg: "Key added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updatekey = async (req, res) => {
  const id = req.params.id;
  const { limit, status } = req.body;
  try {
    const key = await key_table.findById(id);
    if (!key) return res.status(404).json({ msg: "Key not found" });
    key.limit = limit;
    key.status = status;
    await key.save();
    res.status(200).json({ msg: "Key usage updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deletekey = async (req, res) => {
  const id = req.params.id;
  try {
    const key = await key_table.findByIdAndDelete(id);
    if (!key) return res.status(404).json({ msg: "Key not found" });
    res.status(200).json({ msg: "Key deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
module.exports = { getkey, addkey, updatekey, deletekey };
