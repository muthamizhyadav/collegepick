const httpStatus = require('http-status');
const College = require('../models/college.model');
const ApiError = require('../utils/ApiError');
const { multiFieldUploadToS3 } = require('../utils/s3.upload');

const createCollege = async (req) => {
  const body = req.body;
  if (req.files) {
    const uploadResult = await multiFieldUploadToS3(req.files, 'college');
    const keysByCategory = {
      logo: uploadResult?.logo?.map((item) => item.key) ?? [],
      broucher: uploadResult?.broucher?.map((item) => item.key) ?? [],
    };
    const filteredData = Object.fromEntries(Object.entries(keysByCategory).filter(([_, value]) => value.length > 0));
    const createCLG = await College.create({ ...body, ...filteredData });
    return createCLG;
  } else {
    const createCLG = await College.create(body);
    return createCLG;
  }
};

const getColleges = async (req) => {
  const findColleges = await College.find();
  return findColleges;
};

const updateCollege = async (req) => {
  const { id } = req.params;
  const body = req.body;
  const college = await College.findById(id);
  if (!college) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'College not found');
  }

  if (req.files) {
    const uploadResult = await multiFieldUploadToS3(req.files, 'college');
    if (uploadResult?.logo?.length) {
      college.logo = uploadResult?.logo?.[0]?.key;
      console.log(college);
    }
    if (uploadResult?.broucher?.length) {
      college.broucher = uploadResult?.broucher?.[0]?.key;
    }
    if (uploadResult?.gallery?.length) {
      college.gallery = [...(college.gallery || []), ...uploadResult.gallery.map((item) => item.key)];
    }
  }

  for (const key in body) {
    if (Array.isArray(body[key])) {
      college[key] = [...(college[key] || []), ...body[key]];
    } else {
      college[key] = body[key];
    }
  }
  await college.save();
  return college;
};

module.exports = {
  createCollege,
  getColleges,
  updateCollege,
};
