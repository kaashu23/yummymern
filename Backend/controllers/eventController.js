const Event = require('../models/Event');
const imagekit = require('../config/imagekit');

// @desc    Get upcoming events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Create event + ImageKit upload
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, seatsAvailable } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/events'
      });
      imageUrl = result.url;
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      seatsAvailable,
      image: imageUrl
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, date, time, seatsAvailable } = req.body;
    
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (seatsAvailable !== undefined) event.seatsAvailable = seatsAvailable;

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/events'
      });
      event.image = result.url;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
