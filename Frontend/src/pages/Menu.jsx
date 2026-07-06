import { useState, useEffect } from 'react';
import api from '../utils/axios';
import MenuTabs from '../components/MenuTabs';
import MenuCard from '../components/MenuCard';
import { useDebounce } from 'use-debounce';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [loading, setLoading] = useState(true);

  // Filters
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState(''); // 'price_asc', 'price_desc', 'rating'

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, debouncedSearchTerm, showVegOnly, sortBy]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      let query = '?';
      if (activeCategory !== 'all') query += `category=${activeCategory}&`;
      if (debouncedSearchTerm) query += `search=${debouncedSearchTerm}&`;
      if (showVegOnly) query += `veg=true&`;
      if (sortBy) query += `sort=${sortBy}&`;

      const res = await api.get(`/menu${query}`);
      setMenuItems(res.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 uppercase tracking-[2px] text-sm font-medium">Our Menu</p>
          <h2 className="font-['Amatic_SC'] text-5xl md:text-6xl text-gray-800 dark:text-white mt-2">
            Check Our <span className="text-[#CE1212]">Yummy Menu</span>
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-1/2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search for dishes, ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:border-[#CE1212] focus:ring-2 focus:ring-[#CE1212]/20 outline-none transition-all text-gray-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap text-gray-700 dark:text-gray-300 font-medium">
              <input
                type="checkbox"
                checked={showVegOnly}
                onChange={(e) => setShowVegOnly(e.target.checked)}
                className="w-5 h-5 text-[#CE1212] bg-gray-100 border-gray-300 rounded focus:ring-[#CE1212] dark:bg-gray-700 dark:border-gray-600"
              />
              Veg Only
            </label>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-2 whitespace-nowrap">
              <FiFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-xl border-transparent focus:border-[#CE1212] focus:ring-0 outline-none cursor-pointer"
              >
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <MenuTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Menu Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#CE1212]"></div>
          </div>
        ) : menuItems.length > 0 ? (
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {menuItems.map((item) => (
              <motion.div 
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <MenuCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No dishes found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
