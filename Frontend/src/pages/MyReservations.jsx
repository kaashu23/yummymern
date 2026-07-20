import { motion, AnimatePresence } from 'framer-motion';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MyReservations = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [cancelModalId, setCancelModalId] = useState(null);

  const fetchReservations = async () => {
    try {
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/reservations/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setReservations(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load reservations');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const executeCancel = async (id) => {
    setCancelModalId(null);
    
    try {
      toast.loading("Cancelling...", { id: 'cancelRes' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/reservations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        toast.success("Reservation cancelled", { id: 'cancelRes' });
        fetchReservations();
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Failed to cancel", { id: 'cancelRes' });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error cancelling reservation", { id: 'cancelRes' });
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'Pending': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'Completed': return 'text-white/60 bg-white/5 border-white/10';
      case 'Cancelled': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-white/60 bg-white/5 border-white/10';
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
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Welcome Back</span>
          <h1 className="font-['EB_Garamond'] text-4xl md:text-6xl text-white/90 font-medium">
            {user?.firstName || 'Your'} <span className="italic text-white/50">Reservations</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {reservations.length === 0 ? (
            <p className="text-white/40 text-sm font-light">You have no upcoming reservations.</p>
          ) : (
            reservations.map((res, index) => (
              <motion.div 
                key={res._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-['EB_Garamond'] text-2xl text-white/90">{new Date(res.date).toLocaleDateString()}</span>
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                      {res.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-light text-white/50">
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Time</strong> {res.timeSlot}</p>
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Party</strong> {res.partySize} Guests</p>
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Table</strong> {res.table?.tableNumber ? `Table ${res.table.tableNumber} (${res.table.location})` : 'Auto-Assigned'}</p>
                  </div>
                  <p className="text-[10px] tracking-widest text-white/30 uppercase mt-2">ID: {res._id}</p>
                </div>

                {res.status === 'Confirmed' || res.status === 'Pending' ? (
                  <button onClick={() => setCancelModalId(res._id)} className="text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-white border border-red-500/30 hover:border-red-400 hover:bg-red-900/20 px-6 py-3 rounded-full transition-colors whitespace-nowrap">
                    Cancel Booking
                  </button>
                ) : null}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelModalId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl w-full mx-auto bg-[#0a0a0a] border border-red-500/20 py-8 px-8 md:py-10 md:px-12 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl relative rounded-2xl text-center md:text-left"
            >
              <div className="text-red-500 bg-red-500/10 p-5 rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-4xl font-light">warning</span>
              </div>
              
              <div className="flex-1 flex flex-col w-full">
                <h2 className="font-['EB_Garamond'] text-3xl text-white mb-2">Cancel Reservation?</h2>
                <p className="text-white/50 text-sm font-light mb-8">This action cannot be undone. You will need to book a new table if you change your mind.</p>
                
                <div className="flex gap-4 w-full mt-auto">
                  <button 
                    className="flex-1 py-3 px-4 rounded-lg text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
                    onClick={() => setCancelModalId(null)}
                  >
                    Keep It
                  </button>
                  <button 
                    className="flex-1 py-3 px-4 rounded-lg text-[10px] uppercase tracking-[0.2em] text-white bg-red-900/30 border border-red-500/30 hover:bg-red-500 hover:border-red-500 transition-colors"
                    onClick={() => executeCancel(cancelModalId)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyReservations;
