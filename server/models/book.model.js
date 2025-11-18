const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  page: Number,
  ayah: Number,
  userId: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Book", bookSchema);
