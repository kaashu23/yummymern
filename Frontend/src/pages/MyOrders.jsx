import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { getToken } = useAuth();

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders/myorders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      toast.loading("Cancelling...", { id: 'cancel' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders/${id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order cancelled", { id: 'cancel' });
        fetchOrders();
      } else {
        toast.error("Could not cancel order: " + data.message, { id: 'cancel' });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling order", { id: 'cancel' });
    }
  };

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
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-white/20">receipt_long</span>
              </div>
              <h3 className="font-['EB_Garamond'] text-3xl md:text-4xl text-white/90 mb-4">No Orders Yet</h3>
              <p className="text-white/50 text-base md:text-lg font-light max-w-md mb-8">You haven't placed any orders with us. Explore our menu to find your next culinary delight.</p>
              <a href="/order-online" className="font-['Manrope'] text-[10px] uppercase tracking-[0.2em] text-[#050505] bg-white px-8 py-4 rounded-full hover:bg-[#c5a059] hover:text-white transition-all duration-500 font-bold">
                Browse Menu
              </a>
            </motion.div>
          ) : (
            orders.map((order, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-10 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                  <div>
                    <span className="text-[10px] tracking-widest text-white/30 uppercase">{order._id}</span>
                    <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-['EB_Garamond'] text-2xl text-[#c5a059]">₹{order.totalAmount}</span>
                    <span className={`text-[9px] uppercase tracking-widest px-4 py-2 rounded-full border ${order.status === 'pending' || order.status === 'Preparing' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30' : order.status === 'cancelled' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-green-900/20 text-green-400 border-green-500/30'}`}>
                      {order.status}
                    </span>
                    {(order.status === 'pending' || order.status === 'Preparing') && (
                      <button onClick={() => handleCancel(order._id)} className="text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-900/20 transition">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-sm font-light text-white/50">
                    {order.items?.map(i => `${i.menuItem?.name || 'Item'} (x${i.quantity})`).join(', ') || 'Various items'}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;
