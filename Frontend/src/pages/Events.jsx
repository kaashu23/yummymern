import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../utils/axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
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
          className="mb-24 text-center md:text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Experiences</span>
          <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 font-medium">
            Upcoming <span className="italic text-white/50">Events</span>
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
                Loading experiences...
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/2] sm:aspect-[16/10] overflow-hidden rounded-xl mb-6 border border-white/5 shadow-2xl">
                    <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                    {event.image && (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                      />
                    )}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="bg-[#050505]/80 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-[#c5a059]">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-['EB_Garamond'] text-2xl text-white/90 group-hover:text-[#c5a059] transition-colors duration-500">
                      {event.title}
                    </h3>
                    <span className="text-xs tracking-widest text-white/40 pt-1">{event.time}</span>
                  </div>
                  
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <button className="text-[10px] uppercase tracking-[0.3em] text-white hover:text-[#c5a059] transition-colors border-b border-white/20 hover:border-[#c5a059] pb-1">
                    Reserve Seats (₹{(event.price || 0).toLocaleString()})
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
