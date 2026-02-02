const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine for different upload types
const createStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `teapot-gardens/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1000, height: 1000, crop: 'limit' }], // Resize large images
    },
  });
};

// Create multer upload instances for different purposes
const uploadEvent = multer({ storage: createStorage('events') });
const uploadProgram = multer({ storage: createStorage('programs') });
const uploadProfile = multer({ storage: createStorage('profiles') });

module.exports = {
  cloudinary,
  uploadEvent,
  uploadProgram,
  uploadProfile,
};
