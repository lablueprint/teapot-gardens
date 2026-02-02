import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://localhost:4000';

/**
 * Pick an image from the device's library
 * @param {Object} options - ImagePicker options
 * @returns {Object|null} - Image result or null if cancelled
 */
export const pickImage = async (options = {}) => {
  const defaultOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  };

  const result = await ImagePicker.launchImageLibraryAsync({
    ...defaultOptions,
    ...options,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
};

/**
 * Take a photo with the camera
 * @param {Object} options - ImagePicker options
 * @returns {Object|null} - Image result or null if cancelled
 */
export const takePhoto = async (options = {}) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Camera permission is required to take photos');
    return null;
  }

  const defaultOptions = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  };

  const result = await ImagePicker.launchCameraAsync({
    ...defaultOptions,
    ...options,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0];
};

/**
 * Upload an image to the server
 * @param {string} uri - Local URI of the image
 * @param {string} uploadType - Type of upload: 'event', 'program', or 'profile'
 * @param {string} entityId - ID of the event, program, or user
 * @returns {Object} - Server response with imageUrl
 */
export const uploadImage = async (uri, uploadType, entityId) => {
  const formData = new FormData();

  // Get the file extension
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  formData.append('image', {
    uri,
    name: `upload.${fileType}`,
    type: `image/${fileType}`,
  });

  try {
    const response = await axios.post(
      `${API_URL}/api/upload/${uploadType}/${entityId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Upload multiple images to an event
 * @param {Array} uris - Array of local URIs
 * @param {string} eventId - ID of the event
 * @returns {Object} - Server response with imageUrls
 */
export const uploadMultipleImages = async (uris, eventId) => {
  const formData = new FormData();

  uris.forEach((uri, index) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    formData.append('images', {
      uri,
      name: `upload_${index}.${fileType}`,
      type: `image/${fileType}`,
    });
  });

  try {
    const response = await axios.post(
      `${API_URL}/api/upload/event/${eventId}/multiple`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

/**
 * Pick and upload a profile picture
 * @param {string} userId - User ID
 * @returns {Object} - Server response with imageUrl
 */
export const pickAndUploadProfilePicture = async (userId) => {
  const image = await pickImage({ aspect: [1, 1] });
  if (!image) return null;

  return await uploadImage(image.uri, 'profile', userId);
};

/**
 * Pick and upload an event photo
 * @param {string} eventId - Event ID
 * @returns {Object} - Server response with imageUrl
 */
export const pickAndUploadEventPhoto = async (eventId) => {
  const image = await pickImage({ aspect: [4, 3] });
  if (!image) return null;

  return await uploadImage(image.uri, 'event', eventId);
};

/**
 * Pick and upload a program cover image
 * @param {string} programId - Program ID
 * @returns {Object} - Server response with imageUrl
 */
export const pickAndUploadProgramCover = async (programId) => {
  const image = await pickImage({ aspect: [16, 9] });
  if (!image) return null;

  return await uploadImage(image.uri, 'program', programId);
};
