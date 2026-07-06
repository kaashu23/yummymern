import { motion } from 'framer-motion';

const Chefs = () => {
  const chefs = [
    {
      id: 1,
      name: "Marcus Aurelius",
      role: "Executive Head Chef",
      bio: "With over 20 years in Michelin-starred kitchens across Paris and Tokyo, Marcus brings a radical precision to classic gastronomy. He believes in sensory storytelling through minimalist plating.",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2784&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Isabella Rossi",
      role: "Chef de Cuisine",
      bio: "Isabella's approach to ingredient sourcing borders on obsession. She works intimately with local foragers and artisans to bring hyper-seasonal, untamed flavors to the table.",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Kenji Sato",
      role: "Master Patissier",
      bio: "A structural engineer turned pastry chef, Kenji constructs desserts that defy gravity. His creations are architectural marvels that balance intense dark chocolates with vibrant citrus.",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2777&auto=format&fit=crop"
    }
  ];

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

        <div className="flex flex-col gap-32">
          {chefs.map((chef, index) => (
            <motion.div 
              key={chef.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-50 z-10"></div>
                  <img 
                    src={chef.image} 
                    alt={chef.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                  />
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
        </div>
      </div>
    </div>
  );
};

export default Chefs;
