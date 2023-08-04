const Book = require("../models/Book");
const path = require("path");

// Get all Books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single Book
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a Book
exports.createBook = async (req, res, next) => {
  try {
    const books = await Book.create(req.body);
   
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Book
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: {} });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Upload Book Image
exports.uploadImage = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const imgUrl = req.files.imgUrl;
    // Validate Image
    const fileSize = imgUrl.size / 1000;
    const fileExt = imgUrl.name.split(".")[1];
    if (fileSize > 500) {
      return res
        .status(400)
        .json({ message: "file size must be lower than 500kb" });
    }

    if (!["jpg","jpeg", "png"].includes(fileExt)) {
      return res
        .status(400)
        .json({ message: "file extension must be jpg or png" });
    }

    const fileName = `${req.params.id}${path.extname(imgUrl.name)}`;
    imgUrl.mv(`uploads/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      // update book image field
      await Book.findByIdAndUpdate(req.params.id, { imgUrl: fileName });
      res.status(200).json({
        data: {
          file: `${req.protocol}://${req.get("host")}/${fileName}`,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
