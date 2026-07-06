import { motion } from 'framer-motion';

const AdminReservations = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Reservations</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage incoming bookings and table assignments.</p>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="date" 
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:border-[#c5a059] outline-none transition-colors"
          />
          <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
            Export CSV
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
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">ID</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Guest</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Time</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Party/Table</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: "RES-001", guest: "Julianne Moore", time: "19:30", party: "4", table: "T-12", status: "Seated" },
                { id: "RES-002", guest: "Marcus Thorne", time: "20:00", party: "2", table: "T-05", status: "Confirmed" },
                { id: "RES-003", guest: "Elena Rodriguez", time: "20:15", party: "6", table: "T-08", status: "Pending" },
              ].map((res) => (
                <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6 text-xs text-white/40">{res.id}</td>
                  <td className="px-8 py-6 text-sm text-white/90">{res.guest}</td>
                  <td className="px-8 py-6 text-sm text-white/60">{res.time}</td>
                  <td className="px-8 py-6 text-sm text-white/60">{res.party} Guests • {res.table}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">{res.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <select className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:border-[#c5a059] outline-none">
                      <option className="bg-[#0a0a0a]">Update...</option>
                      <option className="bg-[#0a0a0a]">Confirm</option>
                      <option className="bg-[#0a0a0a]">Seat</option>
                      <option className="bg-[#0a0a0a]">Complete</option>
                      <option className="bg-[#0a0a0a]">Cancel</option>
                    </select>
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

export default AdminReservations;
