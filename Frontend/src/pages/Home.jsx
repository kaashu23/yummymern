import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  // For Parallax effects
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Parallax
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Section 2 Parallax
  const ySection2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 font-['Manrope'] overflow-hidden min-h-screen">
      
      {/* Noise Texture Overlay for Premium Feel */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>


      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 pb-20">
        <motion.div style={{ y: yHero, scale: 1.05 }} className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-60" alt="Fine Dining" src="/images/hero_fine_dining.jpg" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]"></div>
        </motion.div>

        <motion.div style={{ opacity: opacityHero }} className="relative z-10 text-center w-full px-4 flex flex-col items-center mt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#c5a059] mb-6 block"
          >
            A Michelin Experience
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-['EB_Garamond'] text-6xl md:text-8xl lg:text-[120px] leading-[0.9] text-white/90 font-medium mb-8"
          >
            Art on a <br/><span className="italic text-[#c5a059]">Plate</span>
          </motion.h1>


          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button onClick={() => navigate('/reservation')} className="relative overflow-hidden group border border-white/20 rounded-full px-10 py-4">
              <span className="relative z-10 text-xs uppercase tracking-[0.2em] text-white group-hover:text-[#050505] transition-colors duration-500">Reserve Your Experience</span>
              <div className="absolute inset-0 bg-[#c5a059] transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Discover</span>
          <motion.div 
            animate={{ height: ["0px", "40px", "0px"], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-white/40 origin-top"
          />
        </motion.div>
      </section>

      {/* The Atmosphere Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-16 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="w-full md:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <motion.img 
              style={{ y: ySection2 }}
              className="w-full h-[120%] object-cover object-center -top-[10%]" 
              alt="Restaurant Interior" 
              src="/images/interior_restaurant.jpg" 
            />
          </motion.div>
          {/* Floating glass card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -right-10 md:-right-20 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-[280px]"
          >
            <p className="font-['EB_Garamond'] italic text-xl text-[#c5a059] mb-2">"An unforgettable atmosphere"</p>
            <p className="text-xs text-white/40 uppercase tracking-widest">— The Michelin Guide</p>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-6"
          >
            The Atmosphere
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-['EB_Garamond'] text-5xl md:text-6xl text-white/90 leading-tight mb-8"
          >
            Elegance in <br/><span className="italic text-white/50">every detail.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/50 text-sm md:text-base leading-relaxed mb-10"
          >
            Step into a sanctuary of modern luxury. Our dining room is designed to strip away the noise of the city, leaving only the purest focus on the culinary journey ahead. Warm lighting, bespoke acoustics, and impeccable service await.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link to="/about" className="inline-flex items-center gap-4 group">
              <span className="text-xs uppercase tracking-[0.2em] text-white group-hover:text-[#c5a059] transition-colors">Our Story</span>
              <div className="w-8 h-[1px] bg-white group-hover:bg-[#c5a059] group-hover:w-16 transition-all duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes Minimal Grid */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">The Menu</span>
              <h2 className="font-['EB_Garamond'] text-4xl md:text-5xl text-white/90">Signature <span className="italic text-white/50">Creations</span></h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Link to="/menu" className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors pb-1 border-b border-white/20 hover:border-white">
                View Full Menu
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Scallop Carpaccio", price: "$45", desc: "Truffle vinaigrette, microherbs, gold leaf.", delay: 0.1 },
              { name: "Wagyu A5 Striploin", price: "$120", desc: "Smoked garlic purée, bone marrow jus.", delay: 0.3 },
              { name: "Dark Chocolate Sphere", price: "$35", desc: "Passionfruit center, almond praline.", delay: 0.5 }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-[#111] rounded-xl mb-6 relative overflow-hidden">
                   {/* We don't have 3 images, so we'll use a refined gradient placeholder for luxury minimalism */}
                   <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505] group-hover:scale-105 transition-transform duration-700"></div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059]">Discover</span>
                   </div>
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-['EB_Garamond'] text-xl text-white/90 group-hover:text-[#c5a059] transition-colors">{item.name}</h3>
                  <span className="text-sm font-light text-white/50">{item.price}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
