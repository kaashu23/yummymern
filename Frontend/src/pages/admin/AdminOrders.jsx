import { motion } from 'framer-motion';

const AdminOrders = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Takeaway Orders</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage incoming delivery and pickup orders.</p>
        </div>
        <button className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          Export CSV
        </button>
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
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Order ID</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Customer</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Type</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Total</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: "ORD-9432", guest: "John Doe", type: "Delivery", total: "$150.50", status: "Preparing" },
                { id: "ORD-9433", guest: "Sarah Smith", type: "Pickup", total: "$45.00", status: "Pending" },
              ].map((ord) => (
                <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6 text-xs text-white/40">{ord.id}</td>
                  <td className="px-8 py-6 text-sm text-white/90">{ord.guest}</td>
                  <td className="px-8 py-6 text-sm text-white/60">{ord.type}</td>
                  <td className="px-8 py-6 text-sm text-white/90">{ord.total}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">{ord.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <select className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:border-[#c5a059] outline-none">
                      <option className="bg-[#0a0a0a]">Update...</option>
                      <option className="bg-[#0a0a0a]">Preparing</option>
                      <option className="bg-[#0a0a0a]">Ready</option>
                      <option className="bg-[#0a0a0a]">Out for Delivery</option>
                      <option className="bg-[#0a0a0a]">Delivered</option>
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

export default AdminOrders;
