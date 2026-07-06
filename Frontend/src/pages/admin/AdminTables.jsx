import { motion } from 'framer-motion';

const AdminTables = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Tables</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage restaurant capacity and floor plan.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Add Table
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {[
          { num: "T-01", capacity: 2, location: "Indoor", active: true },
          { num: "T-02", capacity: 2, location: "Indoor", active: true },
          { num: "T-03", capacity: 4, location: "Indoor", active: true },
          { num: "T-04", capacity: 6, location: "Indoor", active: false },
          { num: "T-05", capacity: 4, location: "Outdoor", active: true },
        ].map((table) => (
          <div key={table.num} className={`p-6 rounded-2xl border transition-colors ${table.active ? 'bg-[#0a0a0a] border-white/10 hover:border-[#c5a059]/50' : 'bg-red-950/10 border-red-900/30'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{table.num}</h3>
              <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-full ${table.active ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {table.active ? 'Active' : 'Offline'}
              </span>
            </div>
            <p className="text-sm text-white/50 font-light mb-1"><span className="text-white/30 mr-2 text-xs uppercase">Capacity</span> {table.capacity} Guests</p>
            <p className="text-sm text-white/50 font-light"><span className="text-white/30 mr-2 text-xs uppercase">Location</span> {table.location}</p>
            <div className="mt-6 flex justify-end gap-3 border-t border-white/5 pt-4">
              <button className="text-xs text-white/40 hover:text-white transition-colors">Edit</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminTables;
