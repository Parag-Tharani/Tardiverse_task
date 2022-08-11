const { Book } = require("../database/books");
const { User } = require("../database/user");
const jwt = require("jsonwebtoken");
const secret = "thisIsmySECRETkey";


async function fetchAllBooks(req, res){
    try {
      const books = await Book.find();
      return res.status(200).send({ books: books });
    } catch (error) {
      return res.status(500).send(error);
    }
};


async function addBook(req, res){

  try {
    const { title, description } = req.body;

    if (title) {
      let existingTitle = await Book.findOne({ title:title });

      if (existingTitle) {
        return res.status(400).send("Book Already Exists");
      }else{
        await Book.create({ title, description });
        return res.status(201).send("Book added successfully");
      }

    }
    else {
      return res.status(400).send({ message: "Please provide Title of the Book" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

async function booksQuery (req, res){

  try {
    const { title } = req.query;

    if (title) {
      const book = await Book.find({ title: { $regex: title } });
      if (book) {
        return res.status(200).send({ book: book });
      } else {
        return res.status(400).send({ message: "Book not found" });
      }
    }
    else {
      return res.status(400).send("Please Provide a valid Query");
    }
  }
  catch (error) {
    return res.status(500).send(error);
  }
};


const userBookList = async (req, res) => {
    try {
      const { name } = req.params;

      const existingUser = await User.findOne({ name }).populate("books");

      if (!existingUser) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send({bookList: existingUser.books });
    }
    catch (error) {
      return res.status(500).send(error);
    }
  };



async function userParBookList(req, res){

  try {

    const { token } = req.headers;
    const { bookId } = req.params;

    if (!token) {
      return res.status(401).send("Please Login First to get/update particular user details");
    }
    const decoded = jwt.decode(token, secret);

    const existingUser = await User.findOne({ id: decoded.id });

    if (!existingUser) {
      return res.status(400).send("User Not Found");
    }
    else {
      let bookExists = existingUser.books.includes(bookId);

      if (bookExists) {
        return res.status(400).send("Book already Exists in Book List");
      }
      else {
        let books_arr = existingUser.books;
        books_arr.push(bookId);

        await User.findOneAndUpdate({ id: decoded.id }, { books:books_arr });
        return res.status(200).send("Book successfully added to book list" );
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

  

module.exports = {
    fetchAllBooks,
    addBook,
    booksQuery,
    userBookList,
    userParBookList,
};