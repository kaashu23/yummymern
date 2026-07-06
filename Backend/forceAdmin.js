require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Make blackmau6969@gmail.com an admin
    const result = await User.findOneAndUpdate(
      { email: 'blackmau6969@gmail.com' }, 
      { role: 'admin' },
      { new: true }
    );
    console.log('Updated user:', result);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateAdmin();
