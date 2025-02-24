const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// POST: Add a new book
router.post('/books', async (req, res) => {
  const { title, author, genre, publishedYear, availableCopies } = req.body;

  if (!title || !author || !genre || availableCopies === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newBook = new Book({
    title,
    author,
    genre,
    publishedYear,
    availableCopies,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error saving book', error: err });
  }
});

// GET: Retrieve all books or a specific book by ID
router.get('/books/:id?', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    }

    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err });
  }
});

// PUT: Update a book by ID
router.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publishedYear, availableCopies } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      genre,
      publishedYear,
      availableCopies,
    }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err });
  }
});

// DELETE: Remove a book by ID
router.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err });
  }
});

module.exports = router;
