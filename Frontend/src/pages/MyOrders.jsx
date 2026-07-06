import { motion } from 'framer-motion';

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#c5a059]/30 pt-40 pb-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Order History</span>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-6xl text-white/90 font-medium">
            Your <span className="italic text-white/50">Orders</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {[
            { id: "ORD-9432", date: "Today, 7:45 PM", status: "Preparing", total: "$150.50", items: "Wagyu A5, Yuzu Cheesecake" },
            { id: "ORD-8112", date: "Oct 12, 2026", status: "Delivered", total: "$85.00", items: "Truffle Risotto (x2)" }
          ].map((order, idx) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-10 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <div>
                  <span className="text-[10px] tracking-widest text-white/30 uppercase">{order.id}</span>
                  <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mt-1">{order.date}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-['EB_Garamond'] text-2xl text-[#c5a059]">{order.total}</span>
                  <span className={`text-[9px] uppercase tracking-widest px-4 py-2 rounded-full border ${order.status === 'Preparing' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' : 'bg-green-900/20 text-green-400 border-green-500/30'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/5 pt-4">
                <p className="text-sm font-light text-white/50">{order.items}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;
