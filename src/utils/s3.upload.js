const config = require('../config/config');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.s3.access,
  secretAccessKey: config.s3.secret,
  region: config.s3.region,
});

const s3 = new AWS.S3();

export const singleUploadToS3 = async (req, details) => {
  const { folderName } = details;
  const params = {
    Bucket: 'collegepickin',
    Key: `${folderName}/` + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  try {
    const data = await s3.upload(params).promise();
    res.json({
      message: 'File uploaded successfully',
      location: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
};

export const multipleUploadToS3 = async (req, details) => {
  const { folderName } = details;
  const uploadPromises = req.files.map((file) => {
    const params = {
      Bucket: 'collegepickin',
      Key: `${folderName}/` + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return s3.upload(params).promise();
  });
  try {
    const results = await Promise.all(uploadPromises);
    const datas = results.map((data) => data);
    res.json({
      message: 'Files uploaded successfully',
      location: datas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading files');
  }
};
