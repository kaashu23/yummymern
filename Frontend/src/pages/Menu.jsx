import { useState, useEffect } from 'react';
import api from '../utils/axios';
import MenuCard from '../components/MenuCard';
import { useDebounce } from 'use-debounce';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, debouncedSearchTerm]);

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

      const res = await api.get(`/menu${query}`);
      setMenuItems(res.data);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-32 font-['Manrope'] selection:bg-[#c5a059]/30 text-[#f5f5f5] bg-[#050505] relative overflow-hidden">
      
      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Header & Search */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12 border-b border-white/10 pb-12"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Gastronomy</span>
            <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 italic">The <span className="not-italic">Menu</span></h1>
          </div>
          
          <div className="w-full md:w-1/3 relative border-b border-white/20 focus-within:border-[#c5a059] transition-colors pb-2">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-lg">search</span>
            <input
              type="text"
              placeholder="Search curations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 bg-transparent outline-none text-sm md:text-base text-white/90 placeholder-white/30 font-light"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-8 mb-20"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              activeCategory === 'all' 
                ? 'text-[#c5a059]' 
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            All Curations
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat._id 
                  ? 'text-[#c5a059]' 
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Menu List */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="font-['EB_Garamond'] text-2xl italic text-[#c5a059] animate-pulse">
                Curating...
              </div>
            </motion.div>
          ) : menuItems.length > 0 ? (
            <motion.div 
              key="list"
              className="flex flex-col gap-8"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <h3 className="font-['EB_Garamond'] text-3xl italic text-white/30">
                No creations found.
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Menu;
