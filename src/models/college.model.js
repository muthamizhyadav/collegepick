const { boolean } = require('joi');
const mongoose = require('mongoose');
const { v4 } = require('uuid');

const collegeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    college_code: {
      type: String,
    },
    affiliation: {
      type: String,
    },
    established_year: {
      type: String,
    },
    type: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    courses_offered: {
      type: Array,
      default: [],
    },
    departments: {
      type: Array,
      default: [],
    },
    accreditation: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: Array,
    },
    broucher: {
      type: Array,
    },
    gallery: {
      type: Array,
    },
    step: {
      type: Number,
    },
  },
  { timestamps: true }
);

const College = mongoose.model('colleges', collegeSchema);

module.exports = College;
