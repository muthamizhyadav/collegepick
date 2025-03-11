const express = require('express');
const router = express.Router();
const articleController = require('../../controllers/article.controller');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.route('/').post(upload.single('file'), articleController.createArticle).get(articleController.findArticles);
router.route('/:id').put(upload.single('file'),articleController.updateArticleById);

module.exports = router;
