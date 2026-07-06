import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { motion } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get('/gallery');
        setImages(res.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-32 font-['Manrope'] selection:bg-[#c5a059]/30 text-[#f5f5f5] bg-[#050505] relative overflow-hidden">
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-24 border-b border-white/10 pb-12">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Visual Archive</span>
          <h1 className="font-['EB_Garamond'] text-5xl md:text-7xl text-white/90 italic">The <span className="not-italic">Gallery</span></h1>
        </div>

        {/* Masonry-ish Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="font-['EB_Garamond'] text-2xl italic text-[#c5a059] animate-pulse">
              Curating archive...
            </div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item, index) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-xl border border-white/5 cursor-crosshair ${
                  index % 4 === 0 || index % 4 === 3 ? 'aspect-square' : 'aspect-[3/4]'
                }`}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 scale-105 hover:scale-100 transition-all duration-700"
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                  <div>
                    <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mb-1">{item.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-[#c5a059]">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <h3 className="font-['EB_Garamond'] text-3xl italic text-white/30">
              Archive empty.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
