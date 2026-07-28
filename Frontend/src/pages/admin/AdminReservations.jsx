import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { getToken } = useAuth();

  const fetchReservations = async () => {
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success || Array.isArray(data)) {
        setReservations(data.data || data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      toast.loading("Updating status...", { id: 'status' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/reservations/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Status updated!", { id: 'status' });
        fetchReservations();
      } else {
        toast.error("Failed to update status", { id: 'status' });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status", { id: 'status' });
    }
  };

  const exportCSV = () => {
    if (reservations.length === 0) return toast.error("No reservations to export");
    const headers = "ID,Name,Date,Time,Party,Status\n";
    const csvData = reservations.map(r => `${r._id},${r.name},${r.date},${r.time},${r.partySize},${r.status}`).join("\n");
    const blob = new Blob([headers + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'reservations.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Exported CSV successfully");
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Reservations</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage incoming bookings and table assignments.</p>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="date" 
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 focus:border-[#c5a059] outline-none transition-colors"
          />
          <button onClick={exportCSV} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
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
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Guest</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Time</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Party</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reservations.map((res) => (
                <tr key={res._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-6 text-xs text-white/40">{res._id.substring(0,8)}...</td>
                  <td className="px-6 py-6 text-sm text-white/90">{res.guestName || (res.user && res.user.name) || 'Guest'}</td>
                  <td className="px-6 py-6 text-sm text-white/60">{new Date(res.date).toLocaleDateString()} {res.timeSlot}</td>
                  <td className="px-6 py-6 text-sm text-white/60">{res.partySize} Guests</td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">{res.status}</span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <select 
                      value={res.status}
                      onChange={(e) => updateStatus(res._id, e.target.value)}
                      className="bg-[#0a0a0a] border border-white/10 rounded px-2 py-1 text-xs text-white/70 focus:border-[#c5a059] outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Seated">Seated</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-white/40">No reservations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default AdminReservations;
