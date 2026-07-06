import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const MenuItemDetail = () => {
  const { id } = useParams();
  
  // Dummy data representing the detailed view of a menu item
  const item = {
    id: id || "1",
    name: "Wagyu A5 Striploin",
    category: "Dinner",
    price: "$120",
    description: "Our signature Wagyu A5 is sourced directly from Miyazaki Prefecture. It is lightly seared over binchotan charcoal and served with a smoked black garlic purée, seasonal wild mushrooms, and a rich bone marrow jus. A sensory experience designed to melt on the palate.",
    isVeg: false,
    isChefSpecial: true,
    averageRating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1544025162-811114bd42c4?q=80&w=2938&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2831&auto=format&fit=crop"
    ],
    reviews: [
      { id: 1, user: "Elena M.", rating: 5, date: "October 12, 2026", comment: "Absolutely transcendent. The purée pairs beautifully with the richness of the beef." },
      { id: 2, user: "James T.", rating: 5, date: "September 28, 2026", comment: "The best steak I've ever had, full stop." }
    ]
  };

  const [activeImage, setActiveImage] = useState(0);

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
              <img 
                src={item.images[activeImage]} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {item.images.length > 1 && (
              <div className="flex gap-4">
                {item.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square w-24 rounded-lg overflow-hidden border ${activeImage === idx ? 'border-[#c5a059]' : 'border-transparent opacity-50'} transition-all`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059]">{item.category}</span>
              {item.isChefSpecial && <span className="text-[10px] uppercase tracking-widest bg-[#c5a059]/20 text-[#c5a059] px-3 py-1 rounded-full border border-[#c5a059]/30">Chef's Special</span>}
              {item.isVeg && <span className="text-[10px] uppercase tracking-widest bg-green-900/40 text-green-400 px-3 py-1 rounded-full border border-green-500/30">Vegetarian</span>}
            </div>

            <h1 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90 mb-4">{item.name}</h1>
            <p className="font-['EB_Garamond'] text-2xl text-white/70 italic mb-8">{item.price}</p>
            
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-12">
              {item.description}
            </p>

            <div className="border-t border-white/10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/60">Guest Reviews</h3>
                <div className="flex items-center gap-2 text-sm text-[#c5a059]">
                  <span>★</span> <span className="text-white/90 font-['EB_Garamond']">{item.averageRating}</span>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {item.reviews.map(review => (
                  <div key={review.id} className="bg-white/5 border border-white/5 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-['EB_Garamond'] text-white/90 text-lg">{review.user}</span>
                      <span className="text-[10px] tracking-widest text-white/30">{review.date}</span>
                    </div>
                    <div className="flex gap-1 text-[#c5a059] text-xs mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                      ))}
                    </div>
                    <p className="text-white/50 text-sm font-light leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
