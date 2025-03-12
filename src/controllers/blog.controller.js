const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const blogService = require('../services/blogs.service');

const createBlog = catchAsync(async (req, res) => {
  const data = await blogService.createBlog(req);
  res.status(httpStatus.CREATED).send(data);
});

const findBlogs = catchAsync(async (req, res) => {
  const data = await blogService.findBlogs(req);
  res.send(data);
});

const updateBlogById = catchAsync(async (req, res) => {
  const data = await blogService.updateBlogById(req);
  res.send(data);
});

const deleteBlogById = catchAsync(async (req, res) => {
  const data = await blogService.deleteBlogById(req);
  res.send(data);
});

module.exports = {
  createBlog,
  findBlogs,
  updateBlogById,
  deleteBlogById,
};
