const mongoose = require("mongoose");
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase : true,
      validate: [ isEmail, 'invalid email' ]
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