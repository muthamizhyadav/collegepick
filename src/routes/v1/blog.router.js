const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blog.controller');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.route('/').post(upload.single('file'), blogController.createBlog).get(blogController.findBlogs);
router.route('/:id').put(upload.single('file'),blogController.updateBlogById).delete(blogController.deleteBlogById);

module.exports = router;
