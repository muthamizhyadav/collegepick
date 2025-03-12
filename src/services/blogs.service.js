const httpStatus = require('http-status');
const Blog = require('../models/blogs.model');
const ApiError = require('../utils/ApiError');
const { singleUploadToS3 } = require('../utils/s3.upload');

const createBlog = async (req) => {
  const body = req.body;
  if (req.file) {
    const folderName = 'blogs';
    const uploadedData = await singleUploadToS3(req.file, folderName);
    const s3Path = uploadedData.Key;
    return await Blog.create({ ...body, ...{ imageUrl: s3Path } });
  } else {
    return await Blog.create(body);
  }
};

const findBlogs = async (req) => {
  const findBlog = await Blog.find();
  return findBlog;
};

const updateBlogById = async (req) => {
  const id = req.params.id;
  const body = req.body;
  let findBlogById = await Blog.findById(id);
  if (!findBlogById) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found.');
  }
  if (req.file) {
    const folderName = 'blogs';
    const uploadedData = await singleUploadToS3(req.file, folderName);
    const s3Path = uploadedData.Key;
    const updationValue = { ...body, ...{ imageUrl: s3Path } };
    findBlogById = await Blog.findByIdAndUpdate({ _id: id }, updationValue, { new: true });
  } else {
    findBlogById = await Blog.findByIdAndUpdate({ _id: id }, body, { new: true });
  }
  return findBlogById;
};

const deleteBlogById = async (req) => {
  const id = req.params.id;
  let findBlog = await Blog.findById(id);
  if (!findBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  findBlog.remove();
  return findBlog;
};

module.exports = {
  createBlog,
  findBlogs,
  updateBlogById,
  deleteBlogById,
};
