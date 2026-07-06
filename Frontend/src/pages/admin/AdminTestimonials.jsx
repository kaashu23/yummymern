import { motion } from 'framer-motion';

const AdminTestimonials = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Testimonials</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage featured guest quotes for the landing page.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Add Testimonial
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { name: "John Doe", rating: 5, quote: "An absolute masterpiece. Every dish was a work of art.", featured: true },
          { name: "Sarah Smith", rating: 4, quote: "Beautiful atmosphere and fantastic service.", featured: false },
        ].map((review, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-['EB_Garamond'] text-xl text-white/90">{review.name}</h3>
                {review.featured && (
                  <span className="text-[9px] uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full">Featured</span>
                )}
              </div>
              <p className="text-sm font-light text-white/50 italic mb-6">"{review.quote}"</p>
            </div>
            <div className="flex justify-end gap-4 border-t border-white/10 pt-4">
              <button className="text-xs text-[#c5a059] hover:text-white transition-colors">{review.featured ? 'Unfeature' : 'Feature'}</button>
              <button className="text-xs text-white/60 hover:text-white transition-colors">Edit</button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminTestimonials;
