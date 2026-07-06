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
          className="mb-24 text-center"
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
            <motion.div key="content" className="flex flex-col gap-32">
              {chefs.map((chef, index) => (
                <motion.div 
                  key={chef._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5 shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-50 z-10"></div>
                      {chef.image && (
                        <img 
                          src={chef.image} 
                          alt={chef.name} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{chef.role}</span>
                    <h2 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90 mb-8">{chef.name}</h2>
                    <p className="text-white/50 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto md:mx-0">
                      {chef.bio}
                    </p>
                    <div className="mt-10 flex gap-6 justify-center md:justify-start">
                      <span className="text-xs uppercase tracking-widest text-white/30 hover:text-white cursor-pointer transition-colors">Instagram</span>
                      <span className="text-xs uppercase tracking-widest text-white/30 hover:text-white cursor-pointer transition-colors">LinkedIn</span>
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
