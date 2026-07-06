import { motion } from 'framer-motion';

const AdminChefs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Chefs</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage the culinary team profiles.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Add Chef
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { name: "Marcus Aurelius", role: "Executive Head Chef" },
          { name: "Isabella Rossi", role: "Chef de Cuisine" },
          { name: "Kenji Sato", role: "Master Patissier" },
        ].map((chef, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/10 mb-4 overflow-hidden border border-white/20"></div>
            <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mb-1">{chef.name}</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#c5a059] mb-6">{chef.role}</p>
            <div className="w-full flex justify-between border-t border-white/10 pt-4">
              <button className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminChefs;
