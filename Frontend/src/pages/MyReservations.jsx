import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';

const MyReservations = () => {
  const { user } = useUser();

  const reservations = [
    {
      id: "RES-8921",
      date: "November 12, 2026",
      time: "8:00 PM",
      partySize: 2,
      table: "Table 12 (Indoor)",
      status: "Confirmed"
    },
    {
      id: "RES-8410",
      date: "October 5, 2026",
      time: "7:30 PM",
      partySize: 4,
      table: "Table 5 (Outdoor)",
      status: "Completed"
    }
  ];

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
                key={res.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-['EB_Garamond'] text-2xl text-white/90">{res.date}</span>
                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(res.status)}`}>
                      {res.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-light text-white/50">
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Time</strong> {res.time}</p>
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Party</strong> {res.partySize} Guests</p>
                    <p><strong className="text-white/70 uppercase tracking-widest text-[10px] mr-2">Table</strong> {res.table}</p>
                  </div>
                  <p className="text-[10px] tracking-widest text-white/30 uppercase mt-2">ID: {res.id}</p>
                </div>

                {res.status === 'Confirmed' || res.status === 'Pending' ? (
                  <button className="text-[10px] uppercase tracking-[0.2em] text-red-400 hover:text-white border border-red-500/30 hover:border-red-400 hover:bg-red-900/20 px-6 py-3 rounded-full transition-colors">
                    Cancel Booking
                  </button>
                ) : null}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyReservations;
