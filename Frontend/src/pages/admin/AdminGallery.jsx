import { motion } from 'framer-motion';

const AdminGallery = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Gallery</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage portfolio imagery for food, interior, and events.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Upload Image
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group bg-white/5 border border-white/10">
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
              <button className="text-xs text-white hover:text-[#c5a059] transition-colors uppercase tracking-widest">Edit</button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest">Del</button>
            </div>
            <div className="absolute bottom-2 left-2 z-20">
              <span className="text-[8px] uppercase tracking-widest bg-black/50 text-[#c5a059] px-2 py-1 rounded backdrop-blur-sm">Food</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminGallery;
