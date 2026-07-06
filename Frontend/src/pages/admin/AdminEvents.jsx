import { motion } from 'framer-motion';

const AdminEvents = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Events</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage upcoming dining experiences.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          + Add Event
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[
          { title: "Truffle & Wine Tasting", date: "Nov 15, 2026", time: "19:00", seats: 24 },
          { title: "Chef's Table Collaboration", date: "Dec 5, 2026", time: "20:00", seats: 12 },
        ].map((event, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex justify-between items-start">
            <div>
              <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mb-2">{event.title}</h3>
              <p className="text-sm font-light text-white/50 mb-1">{event.date} • {event.time}</p>
              <p className="text-sm font-light text-white/50">Seats: {event.seats}</p>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <button className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
              <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminEvents;
