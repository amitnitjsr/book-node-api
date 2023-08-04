const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadImage,
} = require("../controllers/books");

router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
router.route("/:id/image").post(uploadImage);
module.exports = router;
