import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axios';

const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const res = await api.get('/chefs');
      setChefs(res.data);
    } catch (error) {
      console.error('Failed to fetch chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">The Artisans</span>
          <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 font-medium">
            Our <span className="italic text-white/50">Chefs</span>
          </h1>
        </motion.div>

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
                Loading artisans...
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content" 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {chefs.map((chef, index) => (
                <motion.div 
                  key={chef._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden hover:border-[#c5a059]/30 hover:shadow-[0_0_40px_rgba(197,160,89,0.1)] transition-all duration-700 h-[450px]"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10"></div>
                    {chef.image ? (
                      <img 
                        src={chef.image} 
                        alt={chef.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-white/10">person</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-20 mt-auto p-8 flex flex-col">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-3 block">
                        {chef.role}
                      </span>
                      <h2 className="font-['EB_Garamond'] text-3xl md:text-4xl text-white/90 mb-4">
                        {chef.name}
                      </h2>
                      
                      <div className="overflow-hidden">
                        <p className="text-white/60 font-light text-sm leading-relaxed line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {chef.bio}
                        </p>
                      </div>
                      
                      <div className="mt-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        <button className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] border border-[#c5a059]/30 hover:bg-[#c5a059] hover:text-[#050505] px-4 py-2 rounded-full transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chefs;
