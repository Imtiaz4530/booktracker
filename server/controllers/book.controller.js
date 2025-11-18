const Book = require("../models/book.model");
const jwt = require("jsonwebtoken");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id });
    res.json(books);
  } catch (e) {
    console.log(e);
    res.status(500).json({ Error: e, message: "Server Error from updateBook" });
  }
};

const createBook = async (req, res) => {
  const { id } = req.user;
  const { name, page, ayah } = req.body;

  const book = await Book.create({
    name,
    page,
    ayah: ayah ? ayah : null,
    userId: id,
  });
  res.json(book);
};

const updateBook = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { page, ayah } = req.body;

  try {
    if (!page && !ayah) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (page) book.page = page;
    if (ayah) book.ayah = ayah;

    await book.save();
    res.json(book);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from updateBook" });
  }
};

const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
};
