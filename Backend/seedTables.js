require('dotenv').config();
const mongoose = require('mongoose');
const Table = require('./models/Table');

const tables = [
  { tableNumber: 1, capacity: 4, location: 'Indoor' },
  { tableNumber: 2, capacity: 4, location: 'Indoor' },
  { tableNumber: 3, capacity: 2, location: 'Indoor' },
  { tableNumber: 4, capacity: 2, location: 'Indoor' },
  { tableNumber: 5, capacity: 6, location: 'Indoor' },
  { tableNumber: 6, capacity: 6, location: 'Indoor' },
  { tableNumber: 7, capacity: 8, location: 'Indoor' }, // Chef Table
  { tableNumber: 8, capacity: 4, location: 'Outdoor' }, // Terrace
  { tableNumber: 9, capacity: 4, location: 'Outdoor' }, // Terrace
  { tableNumber: 12, capacity: 2, location: 'Rooftop' },
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB');
    await Table.deleteMany({});
    await Table.insertMany(tables);
    console.log('Tables seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding tables:', err);
    process.exit(1);
  });
