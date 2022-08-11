const express = require("express");
const { fetchAllBooks, addBook, booksQuery, userBookList, userParBookList } = require("../handlers/books");

const bookRouter = express.Router();

bookRouter.get("/books", fetchAllBooks);
bookRouter.post("/addBook", addBook);
bookRouter.get("/booksQuery", booksQuery);
bookRouter.get("/books/:name", userBookList); 
bookRouter.post("/userParBookList/:bookId", userParBookList);

module.exports = { bookRouter };