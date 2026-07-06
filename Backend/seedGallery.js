require('dotenv').config();
const mongoose = require('mongoose');
const GalleryImage = require('./models/GalleryImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/test');
    console.log('MongoDB Connected for Gallery Seeding...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedGallery = async () => {
  try {
    await GalleryImage.deleteMany({});
    console.log('Cleared existing Gallery Images.');

    await GalleryImage.insertMany([
      { image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2942&auto=format&fit=crop', caption: 'The Grand Dining Room', category: 'Interior' },
      { image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', caption: 'Culinary Heritage', category: 'Food' },
      { image: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=2940&auto=format&fit=crop', caption: 'A Symphony of Spices', category: 'Food' },
      { image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', caption: 'The Art of Plating', category: 'Food' },
      { image: 'https://images.unsplash.com/photo-1512413914561-125c156f7091?q=80&w=2864&auto=format&fit=crop', caption: 'Diwali Gala Dinner', category: 'Events' },
      { image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop', caption: 'Tandoor Masters at Work', category: 'Food' },
      { image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2940&auto=format&fit=crop', caption: 'Private Festive Gatherings', category: 'Events' },
      { image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop', caption: 'The Royal Cellar', category: 'Interior' },
      { image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?q=80&w=2940&auto=format&fit=crop', caption: 'Traditional Craftsmanship', category: 'Interior' }
    ]);

    console.log('Successfully seeded Indian gallery items!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedGallery();
});
