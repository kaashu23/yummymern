import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/axios';

const MenuItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/menu/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error('Failed to fetch menu item details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 flex justify-center items-center">
        <div className="font-['EB_Garamond'] text-2xl italic text-[#c5a059] animate-pulse">
          Loading creation...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 flex justify-center items-center">
        <h3 className="font-['EB_Garamond'] text-3xl italic text-white/30">Creation not found.</h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Link to="/menu" className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-12 inline-block">
          &larr; Back to Menu
        </Link>
        
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          {/* Left: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex flex-col gap-6"
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/5 bg-[#111]">
              {(item.image || (item.images && item.images.length > 0)) ? (
                <img 
                  src={item.image || item.images[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 italic">No Image</div>
              )}
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              {item.isChefSpecial && <span className="text-[10px] uppercase tracking-widest bg-[#c5a059]/20 text-[#c5a059] px-3 py-1 rounded-full border border-[#c5a059]/30">Chef's Special</span>}
              {item.dietary?.includes('Vegetarian') && <span className="text-[10px] uppercase tracking-widest bg-green-900/40 text-green-400 px-3 py-1 rounded-full border border-green-500/30">Vegetarian</span>}
              {item.dietary?.includes('Vegan') && <span className="text-[10px] uppercase tracking-widest bg-green-900/40 text-green-400 px-3 py-1 rounded-full border border-green-500/30">Vegan</span>}
              {item.dietary?.includes('Gluten-Free') && <span className="text-[10px] uppercase tracking-widest bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">Gluten-Free</span>}
            </div>

            <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90 mb-4">{item.name}</h1>
            <p className="font-['EB_Garamond'] text-2xl text-white/70 italic mb-8">₹{item.price.toLocaleString()}</p>
            
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-12">
              {item.description}
            </p>

            <div className="border-t border-white/10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">Guest Reviews</h3>
                <div className="flex items-center gap-2 text-sm text-[#c5a059]">
                  <span>★</span> <span className="text-white/90 font-['EB_Garamond']">5.0</span>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="bg-white/5 border border-white/5 p-6 rounded-xl text-center text-white/40 text-sm italic font-['EB_Garamond']">
                  No reviews yet for this creation.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
