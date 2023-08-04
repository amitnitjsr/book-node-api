const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    discount: Number,
    imgUrl: {
      type: String,
      default: "default.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
