const express = require('express');
const router = express.Router();
const { uploadEvent, uploadProgram, uploadProfile, cloudinary } = require('../config/cloudinary');
const Event = require('../models/EventModel');
const Program = require('../models/ProgramModel');
const User = require('../models/UserModel');

// Upload single image for event
router.post('/event/:eventId', uploadEvent.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Add the Cloudinary URL to the event's pictures array
    event.pictures.push(req.file.path);
    await event.save();

    res.json({
      success: true,
      imageUrl: req.file.path,
      event: event,
    });
  } catch (error) {
    console.error('Error uploading event image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Upload multiple images for event
router.post('/event/:eventId/multiple', uploadEvent.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Add all Cloudinary URLs to the event's pictures array
    const imageUrls = req.files.map(file => file.path);
    event.pictures.push(...imageUrls);
    await event.save();

    res.json({
      success: true,
      imageUrls: imageUrls,
      event: event,
    });
  } catch (error) {
    console.error('Error uploading event images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Upload image for program
router.post('/program/:programId', uploadProgram.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const program = await Program.findById(req.params.programId);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Set the program's cover image
    program.coverImage = req.file.path;
    await program.save();

    res.json({
      success: true,
      imageUrl: req.file.path,
      program: program,
    });
  } catch (error) {
    console.error('Error uploading program image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Upload profile picture for user
router.post('/profile/:userId', uploadProfile.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's profile picture
    user.profilePicture = req.file.path;
    await user.save();

    res.json({
      success: true,
      imageUrl: req.file.path,
      user: {
        _id: user._id,
        name: user.name,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete an image from Cloudinary
router.delete('/image', async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: 'No publicId provided' });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
