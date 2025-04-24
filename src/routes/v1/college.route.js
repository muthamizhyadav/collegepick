const express = require('express');
const router = express.Router();
const collegeController = require('../../controllers/college.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router
  .route('/add/fetch')
  .post(
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'broucher', maxCount: 1 }, { name: 'gallery' }]),
    collegeController.createCollege
  ).get(collegeController.getColleges);

router
  .route('/:id')
  .put(
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'broucher', maxCount: 1 }, { name: 'gallery' }]),
    collegeController.updateCollege
  );

module.exports = router;
