import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Reservation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    partySize: '2 Guests',
    timeSlot: '19:30',
  });
  const [isMapActive, setIsMapActive] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, timeSlot: time });
  };

  const revealAvailability = () => {
    if (!formData.date || !formData.partySize || !formData.timeSlot) {
      toast.error('Please fill in all details');
      return;
    }
    
    setLoading(true);
    // Simulate API check
    setTimeout(() => {
      setLoading(false);
      setIsMapActive(true);
    }, 800);
  };

  const selectTable = (tableId, tableName, location) => {
    if (!isMapActive) return;
    setSelectedTable({ id: tableId, name: tableName, location });
  };

  const confirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-40 pb-32 font-['Manrope'] selection:bg-[#c5a059]/30 text-[#f5f5f5] bg-[#050505] relative overflow-hidden">
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-12"
        >
          <header className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059]">Exquisite Dining</span>
            <h1 className="font-['EB_Garamond'] text-5xl md:text-6xl text-white/90 leading-tight">Secure Your <br/><span className="italic text-[#c5a059]">Experience.</span></h1>
          </header>
          
          <div className="p-8 bg-[#0a0a0a] rounded-2xl border border-white/5 flex flex-col gap-8 shadow-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Date</label>
                <input 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-transparent border-b border-white/20 focus:border-[#c5a059] text-white/90 py-2 transition-all outline-none text-sm font-light" 
                  type="date"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Party Size</label>
                <select 
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleInputChange}
                  className="bg-transparent border-b border-white/20 focus:border-[#c5a059] text-white/90 py-2 transition-all outline-none text-sm font-light appearance-none"
                >
                  <option className="bg-[#050505] text-white">2 Guests</option>
                  <option className="bg-[#050505] text-white">4 Guests</option>
                  <option className="bg-[#050505] text-white">6 Guests</option>
                  <option className="bg-[#050505] text-white">8+ Guests</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Preferred Time Slot</label>
              <div className="grid grid-cols-3 gap-4">
                {['18:00', '19:30', '21:00'].map(time => (
                  <button 
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-3 rounded-lg text-xs tracking-wider transition-all duration-300 ${
                      formData.timeSlot === time 
                        ? 'border border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]' 
                        : 'border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <button 
              className="mt-4 bg-white text-[#050505] text-xs uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all duration-500 disabled:opacity-50" 
              onClick={revealAvailability}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Check Availability'}
            </button>
          </div>
        </motion.div>

        {/* Interactive Map */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isMapActive ? 1 : 0.3 }}
          transition={{ duration: 1 }}
          className={`lg:col-span-7 relative ${!isMapActive ? 'pointer-events-none' : ''}`}
        >
          <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-2xl border border-white/5 h-full min-h-[500px] flex flex-col gap-8 shadow-2xl relative">
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-['EB_Garamond'] text-2xl text-white/90">Select Your Atmosphere</h2>
                <p className="text-xs text-white/40 font-light">Click on an available table to select.</p>
              </div>
              <div className="flex gap-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#c5a059]"></span> Available</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/10"></span> Occupied</div>
              </div>
            </div>
            
            {/* Table Map */}
            {isMapActive && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex-grow grid grid-cols-4 grid-rows-4 gap-4"
              >
                {/* Rooftop */}
                <div className="col-span-2 row-span-2 p-4 border border-white/5 rounded-xl flex flex-col justify-center items-center relative group bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Rooftop</div>
                  <div 
                    className={`w-16 h-16 rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 ${selectedTable?.id === 'r1' ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'hover:border-[#c5a059]/50 text-white/50'}`} 
                    onClick={() => selectTable('r1', 'Table 12', 'Rooftop')}
                  >
                    T12
                  </div>
                </div>
                
                {/* Terrace */}
                <div className="col-span-2 row-span-1 p-4 border border-white/5 rounded-xl flex flex-col justify-center items-center relative bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                  <div className="absolute top-2 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Terrace</div>
                  <div className="flex gap-4 w-full justify-center mt-2">
                    <div 
                      className={`w-12 h-8 rounded border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 text-xs ${selectedTable?.id === 'o1' ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'hover:border-[#c5a059]/50 text-white/50'}`} 
                      onClick={() => selectTable('o1', 'Table 08', 'Terrace')}
                    >
                      T08
                    </div>
                    <div className="w-12 h-8 rounded border border-white/5 bg-white/5 flex items-center justify-center cursor-not-allowed text-xs text-white/20">
                      T09
                    </div>
                  </div>
                </div>
                
                {/* Main Hall */}
                <div className="col-span-4 row-span-2 p-4 border border-white/5 rounded-xl flex flex-col relative bg-white/[0.02]">
                  <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Main Dining Hall</div>
                  <div className="grid grid-cols-6 gap-4 mt-8">
                    {['m1', 'm2', 'm3', 'm4', 'm5', 'm6'].map((t, idx) => (
                      <div 
                        key={t}
                        className={`h-16 rounded-lg border flex items-center justify-center text-xs transition-all duration-300 ${
                          ['m3', 'm5'].includes(t) 
                            ? 'border-white/5 bg-white/5 cursor-not-allowed text-white/20' 
                            : `border-white/20 cursor-pointer ${selectedTable?.id === t ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'hover:border-[#c5a059]/50 text-white/50'}`
                        }`}
                        onClick={() => !['m3', 'm5'].includes(t) && selectTable(t, `Table 0${idx+1}`, 'Main Hall')}
                      >
                        T0{idx+1}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chef's Table */}
                <div className="col-span-2 row-span-1 p-4 border border-[#c5a059]/20 bg-[#c5a059]/5 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Chef's Table</span>
                    <span className="text-[10px] text-white/40 italic font-['EB_Garamond']">Exclusive selection</span>
                  </div>
                  <div 
                    className={`w-12 h-8 rounded border flex items-center justify-center cursor-pointer transition-all duration-300 text-xs ${selectedTable?.id === 'c1' ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059]/10'}`} 
                    onClick={() => selectTable('c1', 'Chef Table', 'Kitchen Front')}
                  >
                    <span className="material-symbols-outlined text-[14px]">star</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirmation Summary */}
            <AnimatePresence>
              {selectedTable && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 w-full p-8 bg-[#0a0a0a] border-t border-white/10 rounded-b-2xl flex flex-col md:flex-row justify-between items-center gap-6"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Your Selection</span>
                    <div className="flex items-center gap-4">
                      <span className="font-['EB_Garamond'] text-2xl text-white/90">{selectedTable.name} • {selectedTable.location}</span>
                      <span className="text-sm font-light text-white/50">/ {formData.timeSlot}</span>
                    </div>
                  </div>
                  <button 
                    className="bg-[#c5a059] text-white text-xs uppercase tracking-[0.2em] py-3 px-8 rounded-lg hover:bg-white hover:text-[#050505] transition-all duration-500 disabled:opacity-50 w-full md:w-auto" 
                    onClick={confirmBooking}
                    disabled={loading}
                  >
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-10 text-center flex flex-col items-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full border border-[#c5a059] flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-[#c5a059]/10 rounded-full animate-ping opacity-20"></div>
                <span className="material-symbols-outlined text-[#c5a059] text-3xl">check</span>
              </div>
              <h2 className="font-['EB_Garamond'] text-4xl text-white/90 mb-4">Table Reserved</h2>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-10">Thank you. Your culinary journey begins at YUMMY. A confirmation has been sent to your registered email.</p>
              
              <div className="w-full bg-[#111] border border-[#c5a059]/20 rounded-xl p-6 flex justify-between items-center mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059]"></div>
                
                <div className="flex flex-col gap-1 flex-1 text-left pl-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Table</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-2xl">{selectedTable?.name || 'Selected'}</span>
                </div>
                
                <div className="flex flex-col gap-1 flex-1 border-x border-white/10 px-4 text-center">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Guests</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-2xl">{formData.partySize.split(' ')[0]}</span>
                </div>
                
                <div className="flex flex-col gap-1 flex-1 text-right">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a059]">Time</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-xl">{formData.timeSlot}</span>
                  <span className="text-white/50 text-xs font-light">{new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              
              <button 
                className="w-full bg-white text-[#050505] text-xs uppercase tracking-[0.2em] py-4 rounded-lg hover:bg-[#c5a059] hover:text-white transition-all duration-500" 
                onClick={() => navigate('/menu')}
              >
                Return to Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reservation;
