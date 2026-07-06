import { motion } from 'framer-motion';

const AdminMenu = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Menu Items</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage the culinary offerings and availability.</p>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search menu..."
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:border-[#c5a059] outline-none transition-colors w-64"
          />
          <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
            + Add Item
          </button>
        </div>
      </motion.header>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Item</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Category</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Price</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "Wagyu A5 Striploin", category: "Dinner", price: "$120", active: true },
                { name: "Truffle Risotto", category: "Dinner", price: "$45", active: true },
                { name: "Yuzu Cheesecake", category: "Dessert", price: "$18", active: false },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="text-sm text-white/90">{item.name}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/60">{item.category}</td>
                  <td className="px-8 py-6 text-sm text-white/60">{item.price}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest ${item.active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {item.active ? 'Available' : '86\'d'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-xs text-[#c5a059] hover:text-white mr-4 transition-colors">Edit</button>
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default AdminMenu;
