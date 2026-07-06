import { motion } from 'framer-motion';

const AdminCategories = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Categories</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage menu categories and sections.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Add Category
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {["Breakfast", "Lunch", "Dinner", "Drinks", "Dessert"].map((cat) => (
          <div key={cat} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-[#c5a059]/50 transition-colors flex justify-between items-center">
            <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{cat}</h3>
            <div className="flex gap-4">
              <button className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminCategories;
