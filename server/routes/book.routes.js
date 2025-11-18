const router = require("express").Router();

const {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/book.controller");
const userAuth = require("../middleware/auth.middleware");

router.get("/", userAuth, getAllBooks);
router.post("/create", userAuth, createBook);
router.put("/update/:id", userAuth, updateBook);
router.delete("/:id", userAuth, deleteBook);

module.exports = router;
