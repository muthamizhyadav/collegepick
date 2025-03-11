const mongoose = require('mongoose');
const { v4 } = require('uuid');

const articleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('articles', articleSchema);

module.exports = Article;
