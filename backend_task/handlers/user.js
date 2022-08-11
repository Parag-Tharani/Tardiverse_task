const jwt = require("jsonwebtoken");
const { User } = require("../database/user");

const secret = "thisIsmySECRETkey";


async function registerUser(req, res){

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User Already Exists");
    } else {
      await User.create({ name, email, password });
      return res.status(201).send("User Created Succesfully");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};


async function loginUser(req, res){

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).populate("password")

    if (!existingUser) {
      return res.status(404).send("User not registered ");
    } else {

      if (existingUser.password == password) {

        let token = jwt.sign({id: existingUser.id }, secret);
        return res.status(200).send({ token: token });

      } else {
        return res.status(400).send({ message: "Invalid password" });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
};