import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-[200vh] font-['Manrope'] selection:bg-[#c5a059]/30 text-[#f5f5f5] bg-[#050505] relative overflow-hidden pt-32 pb-32">
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Title Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-32 relative z-10">
        <motion.div style={{ y: y1, opacity: opacity1 }} className="pt-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">The Philosophy</span>
          <h1 className="font-['EB_Garamond'] text-6xl md:text-8xl text-white/90 leading-tight">Our <span className="italic text-[#c5a059]">Manifesto.</span></h1>
        </motion.div>
      </div>

      {/* Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start border-t border-white/10 pt-24">
          
          <div className="md:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-8 block">Origin Story</span>
            <h2 className="font-['EB_Garamond'] text-5xl text-white/90 leading-tight mb-8">
              EST. 2026<br/>
              <span className="italic text-white/50 text-4xl">New York</span>
            </h2>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6 text-sm font-light text-white/60 leading-relaxed">
              <p>
                Yummy was born from a desire to elevate dining beyond the expected. We grew tired of predictable menus and uninspired atmospheres, seeking instead to create a sanctuary where culinary art and elegant design converge.
              </p>
              <p>
                We believe that food should enchant. It should challenge boundaries while remaining profoundly satisfying. It should be a curated experience that engages all the senses. We strip away the unnecessary to reveal the pure, unadulterated essence of every ingredient.
              </p>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5">
              <img src="/images/interior_restaurant.jpg" alt="Restaurant Interior" className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-700" />
            </div>
          </div>

        </div>

        {/* Core Pillars */}
        <div className="mt-40 border-t border-white/10 pt-24">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-16 block">Core Directives</span>
          
          <div className="flex flex-col">
            {[
              { num: 'I', title: 'Immaculate Sourcing', desc: 'We procure ingredients from the absolute zenith of culinary viability. If it isn\'t extraordinary, it doesn\'t enter the kitchen.' },
              { num: 'II', title: 'Elevated Form', desc: 'We refine classic profiles into their most elegant components and rebuild them into exquisite, breathtaking creations.' },
              { num: 'III', title: 'Sensory Immersion', desc: 'Dining is a holistic journey. We curate soundscapes, lighting, and textures to envelop the senses in pure luxury.' }
            ].map((directive) => (
              <div key={directive.num} className="group border-b border-white/10 py-10 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 md:w-1/3">
                  <span className="font-['EB_Garamond'] text-4xl text-[#c5a059] italic w-12">{directive.num}</span>
                  <h3 className="font-['EB_Garamond'] text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors">{directive.title}</h3>
                </div>
                <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 flex items-center">
                  <p className="text-base font-light text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                    {directive.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
