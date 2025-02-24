const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  borrowedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
