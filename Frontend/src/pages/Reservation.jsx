import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/axios';
import { useAuth, useUser } from '@clerk/clerk-react';

const Reservation = () => {
  const navigate = useNavigate();
  
  const getLocalYYYYMMDD = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    date: getLocalYYYYMMDD(),
    partySize: '2 Guests',
    timeSlot: '',
  });
  const [isMapActive, setIsMapActive] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, timeSlot: time });
  };

  const revealAvailability = async () => {
    if (!formData.date || !formData.partySize || !formData.timeSlot) {
      toast.error('Please fill in all details');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.get('/reservations/availability', {
        params: {
          date: formData.date,
          timeSlot: formData.timeSlot,
          partySize: parseInt(formData.partySize.split(' ')[0])
        }
      });
      
      if (!res.data.available && res.data.allTables?.length > 0) {
        // If there are tables in the DB but none available, still show the map so they see it's full!
        setAvailableTables([]);
        setAllTables(res.data.allTables);
        setIsMapActive(true);
        setSelectedTable(null);
        toast.error('No tables available for this time and party size.');
        return;
      } else if (!res.data.available) {
        toast.error('No tables available for this time and party size.');
        setIsMapActive(false);
        setAvailableTables([]);
        setAllTables([]);
        return;
      }
      
      setAvailableTables(res.data.tables);
      setAllTables(res.data.allTables || []);
      setIsMapActive(true);
      setSelectedTable(null); // Reset selection
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to check availability');
    } finally {
      setLoading(false);
    }
  };

  const selectTable = (tableId, tableName, location) => {
    if (!isMapActive) return;
    setSelectedTable({ id: tableId, name: tableName, location });
  };

  const confirmBooking = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to confirm your reservation.');
      return;
    }
    if (!selectedTable) return;
    
    setLoading(true);
    try {
      const token = await getToken();
      await api.post('/reservations', {
        date: formData.date,
        timeSlot: formData.timeSlot,
        partySize: parseInt(formData.partySize.split(' ')[0]),
        tableId: selectedTable.id,
        guestName: user?.fullName || 'Guest'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a table is available in the fetched data
  const isTableAvailable = (tableNumber) => {
    return availableTables.some(t => t.tableNumber === tableNumber);
  };

  const getTableId = (tableNumber) => {
    const t = allTables.find(t => t.tableNumber === tableNumber);
    return t ? t._id : null;
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
                  min={getLocalYYYYMMDD()}
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
                {(() => {
                  const todayStr = getLocalYYYYMMDD();
                  const validSlots = ['18:00', '19:30', '21:00'].filter(timeStr => {
                    if (formData.date < todayStr) return false;
                    if (formData.date === todayStr) {
                      const now = new Date();
                      const [slotHour, slotMinute] = timeStr.split(':').map(Number);
                      if (now.getHours() > slotHour || (now.getHours() === slotHour && now.getMinutes() >= slotMinute)) {
                        return false;
                      }
                    }
                    return true;
                  });

                  if (validSlots.length === 0) {
                    return <div className="col-span-3 text-white/40 text-[10px] italic py-3 text-center border border-white/5 rounded-lg">No slots available for this date</div>;
                  }

                  return validSlots.map(time => (
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
                  ));
                })()}
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
              <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="flex-grow grid grid-cols-4 grid-rows-4 gap-4 min-w-[500px]"
                >
                  {/* Rooftop */}
                  <div className="col-span-2 row-span-2 p-4 border border-white/5 rounded-xl flex flex-col justify-center items-center relative group bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Rooftop</div>
                    <div 
                      className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        !isTableAvailable(12) ? 'border-white/5 bg-white/5 cursor-not-allowed text-white/20' : 
                        selectedTable?.id === getTableId(12) ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'border-white/20 hover:border-[#c5a059]/50 text-white/50 cursor-pointer'
                      }`} 
                      onClick={() => isTableAvailable(12) && selectTable(getTableId(12), 'Table 12', 'Rooftop')}
                    >
                      T12
                    </div>
                  </div>
                  
                  {/* Terrace */}
                  <div className="col-span-2 row-span-1 p-4 border border-white/5 rounded-xl flex flex-col justify-center items-center relative bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="absolute top-2 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Terrace</div>
                    <div className="flex gap-4 w-full justify-center mt-2">
                      {[8, 9].map((tNum) => (
                        <div 
                          key={tNum}
                          className={`w-12 h-8 rounded border flex items-center justify-center text-xs transition-all duration-300 ${
                            !isTableAvailable(tNum) ? 'border-white/5 bg-white/5 cursor-not-allowed text-white/20' : 
                            selectedTable?.id === getTableId(tNum) ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'border-white/20 hover:border-[#c5a059]/50 text-white/50 cursor-pointer'
                          }`} 
                          onClick={() => isTableAvailable(tNum) && selectTable(getTableId(tNum), `Table 0${tNum}`, 'Terrace')}
                        >
                          T0{tNum}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Hall */}
                  <div className="col-span-4 row-span-2 p-4 border border-white/5 rounded-xl flex flex-col relative bg-white/[0.02]">
                    <div className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/30">Main Dining Hall</div>
                    <div className="grid grid-cols-6 gap-4 mt-8">
                      {[1, 2, 3, 4, 5, 6].map((tNum) => (
                        <div 
                          key={tNum}
                          className={`h-16 rounded-lg border flex items-center justify-center text-xs transition-all duration-300 ${
                            !isTableAvailable(tNum) 
                              ? 'border-white/5 bg-white/5 cursor-not-allowed text-white/20' 
                              : `border-white/20 cursor-pointer ${selectedTable?.id === getTableId(tNum) ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059]' : 'hover:border-[#c5a059]/50 text-white/50'}`
                          }`}
                          onClick={() => isTableAvailable(tNum) && selectTable(getTableId(tNum), `Table 0${tNum}`, 'Main Hall')}
                        >
                          T0{tNum}
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
                      className={`w-12 h-8 rounded border flex items-center justify-center transition-all duration-300 text-xs ${
                        !isTableAvailable(7) ? 'border-white/5 bg-white/5 cursor-not-allowed text-white/20' : 
                        selectedTable?.id === getTableId(7) ? 'border-[#c5a059] bg-[#c5a059]/20 text-[#c5a059] cursor-pointer' : 'border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059]/10 cursor-pointer'
                      }`} 
                      onClick={() => isTableAvailable(7) && selectTable(getTableId(7), 'Chef Table', 'Kitchen Front')}
                    >
                      <span className="material-symbols-outlined text-[14px]">star</span>
                    </div>
                  </div>
                </motion.div>
              </div>
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
              className="max-w-2xl w-full mx-auto bg-[#050505] border border-white/10 p-10 md:p-16 text-center flex flex-col items-center shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#c5a059]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#c5a059]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#c5a059]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#c5a059]"></div>

              <div className="text-[#c5a059] mb-6">
                <span className="material-symbols-outlined text-5xl font-light">check_circle</span>
              </div>
              
              <h2 className="font-['EB_Garamond'] text-4xl text-white mb-2">Confirmed.</h2>
              <p className="text-white/40 text-sm font-light mb-10">We look forward to hosting you.</p>
              
              <div className="w-full flex flex-col gap-4 text-left mb-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 shrink-0">Table</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-lg italic text-right">{selectedTable?.name || 'Selected'}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-2 gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 shrink-0">Guests</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-lg italic text-right">{formData.partySize}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-2 gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 shrink-0">Date</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-lg italic text-right">{new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-2 gap-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 shrink-0">Time</span>
                  <span className="text-white/90 font-['EB_Garamond'] text-lg italic text-right">{formData.timeSlot}</span>
                </div>
              </div>
              
              <button 
                className="group relative w-full overflow-hidden border border-white/20 py-3 hover:border-[#c5a059] transition-colors duration-500"
                onClick={() => navigate('/menu')}
              >
                <div className="absolute inset-0 bg-[#c5a059] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10 text-[9px] uppercase tracking-[0.3em] text-white group-hover:text-[#050505] transition-colors duration-500">
                  Return to Menu
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reservation;
