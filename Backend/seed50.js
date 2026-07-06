require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://user:pass@cluster.mongodb.net/test');
    console.log('MongoDB Connected for 50-Item Seeding...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const seed50 = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('Cleared existing MenuItems.');

    const categories = await Category.find();
    if (categories.length === 0) {
      console.log('No categories found. Please run feeder.js first.');
      process.exit(1);
    }

    const startersCat = categories.find(c => c.slug === 'starters') || categories[0];
    const mainsCat = categories.find(c => c.slug === 'mains') || categories[1];
    const dessertsCat = categories.find(c => c.slug === 'desserts') || categories[2];
    const drinksCat = categories.find(c => c.slug === 'drinks') || categories[3];

    const menuItems = [
      // Starters (12)
      { name: 'Samosa Chaat', desc: 'Crispy pastry filled with spiced potatoes, topped with mint and tamarind chutneys, yogurt, and sev.', price: 850, cat: startersCat, img: '/images/samosa_chaat.jpg', veg: true },
      { name: 'Truffle Garlic Naan', desc: 'Hand-stretched sourdough flatbread baked in a clay oven, brushed with truffle oil and confit garlic.', price: 350, cat: startersCat, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Aloo Tikki Chaat', desc: 'Spiced potato patties served with ragda, sweet yogurt, and a medley of chutneys.', price: 650, cat: startersCat, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2821&auto=format&fit=crop', veg: true },
      { name: 'Paneer Tikka Skewers', desc: 'Char-grilled cottage cheese marinated in hung curd and tandoori spices.', price: 950, cat: startersCat, img: 'https://images.unsplash.com/photo-1599487405270-86430b8e9834?q=80&w=2835&auto=format&fit=crop', veg: true },
      { name: 'Chicken Malai Tikka', desc: 'Tender chicken breast chunks steeped in cream, cheese, and cardamom, roasted in the tandoor.', price: 1200, cat: startersCat, img: 'https://images.unsplash.com/photo-1599487405270-86430b8e9834?q=80&w=2835&auto=format&fit=crop', veg: false },
      { name: 'Lamb Seekh Kebab', desc: 'Minced lamb infused with roasted cumin and coriander, skewered and grilled.', price: 1400, cat: startersCat, img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop', veg: false },
      { name: 'Hara Bhara Kebab', desc: 'Spinach and green pea patties stuffed with spiced paneer, shallow fried.', price: 750, cat: startersCat, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2821&auto=format&fit=crop', veg: true },
      { name: 'Amritsari Fish Fry', desc: 'Gram flour coated crispy fish chunks marinated with carom seeds and malt vinegar.', price: 1300, cat: startersCat, img: 'https://images.unsplash.com/photo-1599487405270-86430b8e9834?q=80&w=2835&auto=format&fit=crop', veg: false },
      { name: 'Mushroom Tikka', desc: 'Button mushrooms marinated in a fiery red chili paste and yogurt, tandoor grilled.', price: 850, cat: startersCat, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Tandoori Prawns', desc: 'Jumbo tiger prawns marinated with ginger-garlic paste and yellow chili powder.', price: 1800, cat: startersCat, img: 'https://images.unsplash.com/photo-1599487405270-86430b8e9834?q=80&w=2835&auto=format&fit=crop', veg: false },
      { name: 'Onion Bhaji', desc: 'Crispy onion fritters spiced with ajwain and coriander seeds.', price: 550, cat: startersCat, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2821&auto=format&fit=crop', veg: true },
      { name: 'Dahi Puri', desc: 'Crispy semolina shells filled with potato, yogurt, and sweet and spicy chutneys.', price: 600, cat: startersCat, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2821&auto=format&fit=crop', veg: true },

      // Mains (22)
      { name: 'Murgh Makhani (Butter Chicken)', desc: 'Tandoori-roasted chicken simmered in a rich, velvety tomato and fenugreek gravy.', price: 1800, cat: mainsCat, img: '/images/butter_chicken.jpg', veg: false },
      { name: 'Paneer Tikka Masala', desc: 'Char-grilled cottage cheese cubes folded into a spiced onion-tomato gravy with bell peppers.', price: 1500, cat: mainsCat, img: '/images/paneer_tikka.jpg', veg: true },
      { name: 'Szechuan Fried Rice', desc: 'Wok-tossed long-grain jasmine rice with fiery Szechuan peppercorns, vegetables, and burnt garlic.', price: 1200, cat: mainsCat, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2825&auto=format&fit=crop', veg: true },
      { name: 'Dal Makhani', desc: 'Black lentils slowly simmered overnight over tandoor coals, finished with cultured butter and fresh cream.', price: 950, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Lamb Rogan Josh', desc: 'Slow-braised Kashmiri lamb shank in a vibrant sauce of fennel, ginger, and aromatic spices.', price: 2400, cat: mainsCat, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', veg: false },
      { name: 'Palak Paneer', desc: 'Fresh spinach puréed with garlic and cumin, studded with soft paneer cubes.', price: 1350, cat: mainsCat, img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Chicken Tikka Masala', desc: 'The British-Indian classic: roasted chicken chunks in a spiced, creamy tomato curry.', price: 1750, cat: mainsCat, img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2884&auto=format&fit=crop', veg: false },
      { name: 'Goan Fish Curry', desc: 'Catch of the day simmered in a coconut milk gravy with kokum and fiery red chilies.', price: 2100, cat: mainsCat, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', veg: false },
      { name: 'Chana Masala', desc: 'White chickpeas slow-cooked in a tangy, spiced onion-tomato gravy with amchoor.', price: 1050, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Biryani (Awadhi Chicken)', desc: 'Fragrant basmati rice layered with saffron, rose water, and tender spiced chicken, sealed and dum-cooked.', price: 2200, cat: mainsCat, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2940&auto=format&fit=crop', veg: false },
      { name: 'Biryani (Hyderabadi Lamb)', desc: 'Robustly spiced lamb and basmati rice cooked together with fried onions and mint.', price: 2600, cat: mainsCat, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2940&auto=format&fit=crop', veg: false },
      { name: 'Malai Kofta', desc: 'Potato and paneer dumplings stuffed with nuts, served in a rich cashew-based white gravy.', price: 1450, cat: mainsCat, img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2884&auto=format&fit=crop', veg: true },
      { name: 'Baingan Bharta', desc: 'Smoky roasted eggplant mashed and cooked with garlic, tomatoes, and green peas.', price: 1100, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Bhindi Masala', desc: 'Okra stir-fried with onions, tomatoes, and dry mango powder.', price: 1050, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Mutton Korma', desc: 'Tender mutton pieces braised in a luxurious yogurt and almond gravy flavored with kewra.', price: 2500, cat: mainsCat, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', veg: false },
      { name: 'Kadai Paneer', desc: 'Paneer tossed with bell peppers and tomatoes in a freshly ground coriander and red chili spice mix.', price: 1400, cat: mainsCat, img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2884&auto=format&fit=crop', veg: true },
      { name: 'Vegetable Jalfrezi', desc: 'A colorful medley of seasonal vegetables stir-fried in a tangy tomato sauce.', price: 1150, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Chicken Chettinad', desc: 'A fiery South Indian chicken curry made with roasted coconut and black pepper.', price: 1850, cat: mainsCat, img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2884&auto=format&fit=crop', veg: false },
      { name: 'Dal Tadka', desc: 'Yellow lentils tempered with ghee, cumin seeds, garlic, and dry red chilies.', price: 850, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Aloo Gobi', desc: 'Classic comfort food: potatoes and cauliflower florets sautéed with turmeric and ginger.', price: 950, cat: mainsCat, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Prawn Balchao', desc: 'A spicy and tangy Goan prawn preparation with vinegar and red chilies.', price: 2300, cat: mainsCat, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', veg: false },
      { name: 'Keema Matar', desc: 'Minced lamb cooked with green peas, whole spices, and tomatoes.', price: 2100, cat: mainsCat, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2836&auto=format&fit=crop', veg: false },

      // Desserts (8)
      { name: 'Gulab Jamun', desc: 'Golden-brown milk solids dumplings soaked in a delicate cardamom and rose water syrup.', price: 650, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Rasmalai', desc: 'Soft cottage cheese discs steeped in saffron and cardamom infused milk, garnished with pistachios.', price: 750, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Gajar Ka Halwa', desc: 'Slow-cooked carrot pudding with ghee, khoya, and assorted nuts.', price: 700, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Pista Kulfi', desc: 'Traditional dense Indian ice cream flavored with roasted pistachios and saffron.', price: 550, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Moong Dal Halwa', desc: 'A rich and decadent lentil pudding cooked in copious amounts of ghee.', price: 800, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Jalebi with Rabri', desc: 'Crispy fermented batter swirls soaked in syrup, served with thickened sweetened milk.', price: 650, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Phirni', desc: 'Creamy ground rice pudding flavored with cardamom and served in earthen clay pots.', price: 500, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Shahi Tukda', desc: 'Fried bread soaked in saffron syrup, topped with rich rabri and slivered almonds.', price: 750, cat: dessertsCat, img: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=2940&auto=format&fit=crop', veg: true },

      // Drinks (8)
      { name: 'Saffron Mango Lassi', desc: 'Chilled, creamy yogurt drink blended with Alphonso mangoes and a hint of Kashmiri saffron.', price: 450, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Artisanal Masala Chai', desc: 'A robust blend of Assam tea leaves, freshly ground ginger, cardamom, and cloves, steeped in milk.', price: 350, cat: drinksCat, img: 'https://images.unsplash.com/photo-1571934226194-ce26715b4984?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Sweet Lassi', desc: 'Classic churned yogurt drink sweetened with rose water and topped with malai.', price: 300, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Jal Jeera', desc: 'A refreshing and tangy cumin and mint infused chilled water.', price: 250, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Thandai', desc: 'A chilled milk beverage enriched with almonds, fennel seeds, melon seeds, and rose petals.', price: 500, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Filter Coffee', desc: 'South Indian style frothy coffee brewed through a metal filter.', price: 350, cat: drinksCat, img: 'https://images.unsplash.com/photo-1571934226194-ce26715b4984?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Nimbu Pani', desc: 'Freshly squeezed Indian lemonade with a dash of black salt and roasted cumin.', price: 200, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true },
      { name: 'Rooh Afza Milkshake', desc: 'Chilled milk blended with the iconic cooling rose and herb syrup.', price: 350, cat: drinksCat, img: 'https://images.unsplash.com/photo-1630138980137-b247f0d463b7?q=80&w=2940&auto=format&fit=crop', veg: true }
    ];

    const mappedItems = menuItems.map(item => ({
      name: item.name,
      description: item.desc,
      price: item.price,
      category: item.cat._id,
      image: item.img,
      isAvailable: true,
      dietary: item.veg ? ['Vegetarian'] : ['Gluten-Free']
    }));

    await MenuItem.insertMany(mappedItems);

    console.log(`Successfully seeded ${mappedItems.length} Indian menu items!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seed50();
});
