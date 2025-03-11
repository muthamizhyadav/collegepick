const config = require('../config/config');
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: config.s3.access,
  secretAccessKey: config.s3.secret,
  region: config.s3.region,
});

const s3 = new AWS.S3();

exports.singleUploadToS3 = async (file, folderName) => {
  try {
    const params = {
      Bucket: 'collegepickin',
      Key: `${folderName}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const data = await s3.upload(params).promise();
    return data
  } catch (err) {
    console.error('S3 Upload Error:', err);
    throw new Error('File upload failed');
  }
};

exports.multipleUploadToS3 = async (files, folderName) => {
  try {
    const uploadPromises = files.map((file) => {
      const params = {
        Bucket: 'collegepickin',
        Key: `${folderName}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    return results.map((data) => ({
      success: true,
      location: data.Location,
      key: data.Key,
    }));
  } catch (err) {
    console.error('S3 Multi Upload Error:', err);
    throw new Error('One or more file uploads failed');
  }
};
