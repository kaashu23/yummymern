require('dotenv').config();
const mongoose = require('mongoose');

// Models
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');
const Event = require('./models/Event');
const Chef = require('./models/Chef');
const Testimonial = require('./models/Testimonial');
const GalleryImage = require('./models/GalleryImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/test');
    console.log('MongoDB Connected for Seeding...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    await Event.deleteMany({});
    await Chef.deleteMany({});
    await Testimonial.deleteMany({});
    await GalleryImage.deleteMany({});

    console.log('Existing data cleared.');

    // Categories
    const categories = await Category.insertMany([
      { name: 'Starters', description: 'Begin your journey', slug: 'starters' },
      { name: 'Mains', description: 'The main event', slug: 'mains' },
      { name: 'Desserts', description: 'A sweet finale', slug: 'desserts' },
      { name: 'Drinks', description: 'Curated pairings', slug: 'drinks' }
    ]);

    // Menu Items
    await MenuItem.insertMany([
      {
        name: 'Samosa Chaat',
        description: 'Crispy pastry filled with spiced potatoes, topped with mint and tamarind chutneys, yogurt, and sev.',
        price: 850,
        category: categories[0]._id, // Starters
        image: '/images/samosa_chaat.jpg',
        isAvailable: true,
        dietary: ['Vegetarian']
      },
      {
        name: 'Murgh Makhani (Butter Chicken)',
        description: 'Tandoori-roasted chicken simmered in a rich, velvety tomato and fenugreek gravy.',
        price: 1800,
        category: categories[1]._id, // Mains
        image: '/images/butter_chicken.jpg',
        isAvailable: true,
        dietary: ['Gluten-Free']
      },
      {
        name: 'Paneer Tikka Masala',
        description: 'Char-grilled cottage cheese cubes folded into a spiced onion-tomato gravy with bell peppers.',
        price: 1500,
        category: categories[1]._id, // Mains
        image: '/images/paneer_tikka.jpg',
        isAvailable: true,
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Szechuan Fried Rice',
        description: 'Wok-tossed long-grain jasmine rice with fiery Szechuan peppercorns, vegetables, and burnt garlic.',
        price: 1200,
        category: categories[1]._id, // Mains
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2825&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian', 'Vegan']
      },
      {
        name: 'Gulab Jamun',
        description: 'Golden-brown milk solids dumplings soaked in a delicate cardamom and rose water syrup.',
        price: 650,
        category: categories[2]._id, // Desserts
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian']
      },
      {
        name: 'Saffron Mango Lassi',
        description: 'Chilled, creamy yogurt drink blended with Alphonso mangoes and a hint of Kashmiri saffron.',
        price: 450,
        category: categories[3]._id, // Drinks
        image: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils slowly simmered overnight over tandoor coals, finished with cultured butter and fresh cream.',
        price: 950,
        category: categories[1]._id, // Mains
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Truffle Garlic Naan',
        description: 'Hand-stretched sourdough flatbread baked in a clay oven, brushed with truffle oil and confit garlic.',
        price: 350,
        category: categories[0]._id, // Starters
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian']
      },
      {
        name: 'Lamb Rogan Josh',
        description: 'Slow-braised Kashmiri lamb shank in a vibrant sauce of fennel, ginger, and aromatic spices.',
        price: 2400,
        category: categories[1]._id, // Mains
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Gluten-Free']
      },
      {
        name: 'Rasmalai',
        description: 'Soft cottage cheese discs steeped in saffron and cardamom infused milk, garnished with pistachios.',
        price: 750,
        category: categories[2]._id, // Desserts
        image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Artisanal Masala Chai',
        description: 'A robust blend of Assam tea leaves, freshly ground ginger, cardamom, and cloves, steeped in milk.',
        price: 350,
        category: categories[3]._id, // Drinks
        image: 'https://images.unsplash.com/photo-1571934226194-ce26715b4984?q=80&w=2940&auto=format&fit=crop',
        isAvailable: true,
        dietary: ['Vegetarian', 'Gluten-Free']
      }
    ]);

    // Events
    await Event.insertMany([
      {
        title: 'Truffle & Wine Tasting',
        description: 'An exclusive evening exploring the finest Italian truffles paired with curated wines.',
        date: new Date('2026-11-15T19:00:00Z'),
        time: '19:00',
        price: 18500,
        image: '/images/wine_event.jpg',
        capacity: 24
      }
    ]);

    // Chefs
    await Chef.insertMany([
      {
        name: 'Marcus Aurelius',
        role: 'Executive Head Chef',
        bio: 'With over two decades of Michelin-star experience, Chef Marcus brings relentless innovation.',
        image: '/images/chef_portrait.jpg'
      },
      {
        name: 'Isabella Rossi',
        role: 'Chef de Cuisine',
        bio: 'Isabella works intimately with local foragers to bring hyper-seasonal, untamed flavors to the table.',
        image: '/images/isabella_rossi.jpg'
      },
      {
        name: 'Kenji Sato',
        role: 'Master Patissier',
        bio: 'A structural engineer turned pastry chef, Kenji constructs desserts that defy gravity.',
        image: '/images/kenji_sato.jpg'
      }
    ]);

    // Testimonials
    await Testimonial.insertMany([
      {
        guestName: 'Julianne Moore',
        rating: 5,
        quote: 'An absolute masterpiece. Every dish was a work of art and the atmosphere was divine.',
        isFeatured: true
      }
    ]);

    // Gallery
    await GalleryImage.insertMany([
      {
        caption: 'Main Dining Hall',
        category: 'Interior',
        image: '/images/interior_restaurant.jpg'
      },
      {
        caption: 'Fine Dining Signature',
        category: 'Food',
        image: '/images/hero_fine_dining.jpg'
      },
      {
        caption: 'Art of Plating',
        category: 'Events',
        image: '/images/chef_plating.jpg'
      },
      {
        caption: 'The Grand Cellar',
        category: 'Interior',
        image: '/images/wine_cellar.jpg'
      }
    ]);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});
