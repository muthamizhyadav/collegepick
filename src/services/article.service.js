const httpStatus = require('http-status');
const Article = require('../models/articles.model');
const ApiError = require('../utils/ApiError');
const { singleUploadToS3 } = require('../utils/s3.upload');

const createArticle = async (req) => {
  const body = req.body;
  if (req.file) {
    const folderName = 'article';
    const uploadedData = await singleUploadToS3(req.file, folderName);
    const s3Path = uploadedData.Key;
    return await Article.create({ ...body, ...{ imageUrl: s3Path } });
  } else {
    return await Article.create(body);
  }
};

const findArticles = async (req) => {
  const findArticle = await Article.find();
  return findArticle;
};

const updateArticleById = async (req) => {
  const id = req.params.id;
  const body = req.body;
  let findarticleById = await Article.findById(id);
  if (!findarticleById) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Article not found.');
  }
  if (req.file) {
    const folderName = 'article';
    const uploadedData = await singleUploadToS3(req.file, folderName);
    const s3Path = uploadedData.Key;
    const updationValue = { ...body, ...{ imageUrl: s3Path } };
    findarticleById = await Article.findByIdAndUpdate({ _id: id }, updationValue, { new: true });
  } else {
    findarticleById = await Article.findByIdAndUpdate({ _id: id }, body, { new: true });
  }
  return findarticleById;
};

const deleteArticleById = async (req) => {
  const id = req.params.id;
  let findArticle = await Article.findById(id);
  if (!findArticle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
  }
  findArticle.remove();
  return findArticle;
};

module.exports = {
  createArticle,
  findArticles,
  updateArticleById,
  deleteArticleById,
};
