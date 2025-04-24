const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const collegeService = require('../services/college.services');

const createCollege = catchAsync(async (req, res) => {
  const creation = await collegeService.createCollege(req);
  res.status(httpStatus.CREATED).send(creation);
});

const getColleges = catchAsync(async (req, res) => {
  const fetchColleges = await collegeService.getColleges(req);
  res.send(fetchColleges);
});

const updateCollege = catchAsync(async (req, res) => {
  const update = await collegeService.updateCollege(req);
  res.send(update);
});

module.exports = {
  createCollege,
  updateCollege,
  getColleges,
};
