const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ArticleService = require('../services/article.service');

const createArticle = catchAsync(async (req, res) => {
  const data = await ArticleService.createArticle(req);
  res.status(httpStatus.CREATED).send(data);
});

const findArticles = catchAsync(async (req, res) => {
  const data = await ArticleService.findArticles(req);
  res.send(data);
});

const updateArticleById = catchAsync(async (req, res) => {
  const data = await ArticleService.updateArticleById(req);
  res.send(data);
});

const deleteArticleById = catchAsync(async (req, res) => {
  const data = await ArticleService.deleteArticleById(req);
  res.send(data);
});

module.exports = {
  createArticle,
  findArticles,
  updateArticleById,
  deleteArticleById,
};
