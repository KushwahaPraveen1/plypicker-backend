const { bucket } = require('../config/firebaseConfig');
const multer = require('multer');
const stream = require('stream');

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImage };
