const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    password: {
      type: String,
      required: true,
      select: false,
    }
  }
)

const User = mongoose.model("User", userSchema);

module.exports = { User };