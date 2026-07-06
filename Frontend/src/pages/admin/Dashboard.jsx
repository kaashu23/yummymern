import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch /api/admin/stats
    setTimeout(() => {
      setStats({
        todayReservations: 42,
        todayCovers: 112,
        upcomingEvents: 4,
        totalGuests: 284
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
      return (
          <div className="flex justify-center items-center h-full">
            <div className="font-['EB_Garamond'] text-2xl italic text-[#c5a059] animate-pulse">
              Authenticating Chef...
            </div>
          </div>
      )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      
      {/* Header Section */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Bonjour, <span className="not-italic">Chef.</span></h2>
          <p className="text-sm font-light text-white/50 mt-2">Here is your culinary operations summary for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-lg hover:border-[#c5a059] transition-colors text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Today</span>
          </button>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Reservations', value: stats.todayReservations, icon: 'book_online', change: '+12%' },
          { label: 'Total Covers', value: stats.todayCovers, icon: 'restaurant', change: 'Target: 120' },
          { label: 'Private Events', value: stats.upcomingEvents, icon: 'celebration', change: 'This Week' },
          { label: 'Avg Guest/Table', value: '3.2', icon: 'group', change: 'Optimal' }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-[#c5a059]/50 transition-colors group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059]/10 transition-colors">
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full">{stat.change}</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
              <h3 className="font-['EB_Garamond'] text-4xl text-white/90 mt-2">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recent Bookings Table */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
          <h4 className="font-['EB_Garamond'] text-2xl text-white/90">Upcoming Services</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Guest</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Time</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Party</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="text-sm text-white/90">Julianne Moore</div>
                  <div className="text-[10px] text-[#c5a059] uppercase tracking-widest mt-1">VIP • Regular</div>
                </td>
                <td className="px-8 py-6 text-sm text-white/60">19:30</td>
                <td className="px-8 py-6 text-sm text-white/60">4 Guests</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 rounded-full text-[9px] uppercase tracking-widest bg-white/10 text-white/70 border border-white/20">Seated</span>
                </td>
              </tr>
              
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="text-sm text-white/90">Marcus Thorne</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">First Visit</div>
                </td>
                <td className="px-8 py-6 text-sm text-white/60">20:00</td>
                <td className="px-8 py-6 text-sm text-white/60">2 Guests</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 rounded-full text-[9px] uppercase tracking-widest bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40">Confirmed</span>
                </td>
              </tr>

              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="text-sm text-white/90">Elena Rodriguez</div>
                  <div className="text-[10px] text-red-400 uppercase tracking-widest mt-1">Allergy: Nuts</div>
                </td>
                <td className="px-8 py-6 text-sm text-white/60">20:15</td>
                <td className="px-8 py-6 text-sm text-white/60">6 Guests</td>
                <td className="px-8 py-6">
                  <span className="px-4 py-2 rounded-full text-[9px] uppercase tracking-widest bg-white/5 text-white/40 border border-white/10 animate-pulse">Arriving</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
};

export default Dashboard;
