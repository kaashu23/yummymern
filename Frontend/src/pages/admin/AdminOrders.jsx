import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { getToken } = useAuth();

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders`, {
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

  const updateStatus = async (id, status) => {
    try {
      toast.loading("Updating status...", { id: 'status' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Status updated!", { id: 'status' });
        fetchOrders();
      } else {
        toast.error("Failed to update status", { id: 'status' });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status", { id: 'status' });
    }
  };

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
        <button onClick={fetchOrders} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
          Refresh Data
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
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Order ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Customer</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Type</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Total</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((ord) => (
                <tr key={ord._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-6 text-xs text-white/40">{ord._id.substring(0, 8)}...</td>
                  <td className="px-6 py-6 text-sm text-white/90">{ord.customerInfo?.name || 'Guest'}</td>
                  <td className="px-6 py-6 text-sm text-white/60">{ord.orderType || 'delivery'}</td>
                  <td className="px-6 py-6 text-sm text-white/90">₹{ord.totalAmount}</td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">{ord.status}</span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <select 
                      value={ord.status}
                      onChange={(e) => updateStatus(ord._id, e.target.value)}
                      className="bg-[#0a0a0a] border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:border-[#c5a059] outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-white/40">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default AdminOrders;
