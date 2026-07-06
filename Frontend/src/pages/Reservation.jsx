import { useState } from 'react';
import api from '../utils/axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { FiCalendar, FiClock, FiUsers, FiUser, FiPhone, FiMessageSquare } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Reservation = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const [step, setStep] = useState(1); // 1: Select Details, 2: Available Tables, 3: Confirm Details
  const [loading, setLoading] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '18:00 - 19:30',
    partySize: 2,
    guestName: '',
    guestPhone: '',
    specialRequest: ''
  });

  const timeSlots = [
    '11:00 - 12:30', '12:30 - 14:00', '14:00 - 15:30',
    '18:00 - 19:30', '19:30 - 21:00', '21:00 - 22:30'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async (e) => {
    e.preventDefault();
    if (!formData.date) {
      toast.error("Please select a date.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await api.get('/reservations/availability', {
        params: {
          date: formData.date,
          timeSlot: formData.timeSlot,
          partySize: formData.partySize
        }
      });
      setAvailableTables(res.data);
      if (res.data.length === 0) {
        toast.error("Sorry, no tables available for the selected time and party size.");
      } else {
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to check availability.");
    } finally {
      setLoading(false);
    }
  };

  const proceedToConfirm = (tableId) => {
    setSelectedTable(availableTables.find(t => t._id === tableId));
    // Pre-fill user data if logged in
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        guestName: prev.guestName || user.fullName,
        guestPhone: prev.guestPhone || ''
      }));
    }
    setStep(3);
  };

  const submitReservation = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please log in to confirm your reservation.");
      return;
    }
    
    try {
      setLoading(true);
      
      const payload = {
        tableId: selectedTable._id,
        date: formData.date,
        timeSlot: formData.timeSlot,
        partySize: formData.partySize,
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
        specialRequest: formData.specialRequest
      };

      // Since Clerk syncs user via webhook, the backend needs clerkId in token to attach user
      // But we must send the request. In a real app, we attach the clerk token.
      // For this demo, we assume the backend clerkMiddleware will find the user.
      const clerkToken = await window.Clerk.session.getToken();

      const res = await api.post('/reservations', payload, {
        headers: { Authorization: `Bearer ${clerkToken}` }
      });

      toast.success("Reservation confirmed! Email sent.");
      setStep(4); // Success screen
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to confirm reservation.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="font-['Amatic_SC'] text-5xl md:text-6xl text-gray-800 dark:text-white">
            Book a <span className="text-[#CE1212]">Table</span>
          </h2>
          <p className="text-gray-500 mt-2">Reserve your spot for a delicious experience</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 border border-gray-100 dark:border-gray-700">
          
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-[#CE1212] -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
            
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${step >= i ? 'bg-[#CE1212] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                {i}
              </div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={checkAvailability} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiCalendar className="text-[#CE1212]" /> Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 focus:ring-[#CE1212]/20 outline-none transition-all dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiClock className="text-[#CE1212]" /> Time Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 focus:ring-[#CE1212]/20 outline-none transition-all dark:text-white cursor-pointer"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiUsers className="text-[#CE1212]" /> Party Size
                  </label>
                  <input
                    type="number"
                    name="partySize"
                    min="1"
                    max="20"
                    value={formData.partySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 focus:ring-[#CE1212]/20 outline-none transition-all dark:text-white"
                    required
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CE1212] hover:bg-[#a30e0e] text-white py-4 rounded-xl font-medium transition-all shadow-md mt-4 disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Check Availability"}
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Available Tables for {formData.partySize} guests</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableTables.map((table) => (
                  <button
                    key={table._id}
                    onClick={() => proceedToConfirm(table._id)}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#CE1212] hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
                  >
                    <span className="text-3xl font-bold text-gray-400 group-hover:text-[#CE1212]">T{table.tableNumber}</span>
                    <span className="text-sm text-gray-500 mt-2">{table.location}</span>
                    <span className="text-xs text-gray-400 mt-1">Cap: {table.capacity}</span>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(1)} className="mt-6 text-gray-500 hover:text-gray-800 dark:hover:text-white underline">
                Go Back
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submitReservation} className="space-y-6">
              
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Booking for:</strong> {formData.date} at {formData.timeSlot} <br/>
                  <strong>Table:</strong> T{selectedTable.tableNumber} ({selectedTable.location}) for {formData.partySize} guests
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiUser className="text-[#CE1212]" /> Guest Name
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 outline-none dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiPhone className="text-[#CE1212]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 outline-none dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FiMessageSquare className="text-[#CE1212]" /> Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#CE1212] focus:ring-2 outline-none dark:text-white"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-4 rounded-xl font-medium transition-all">
                  Back
                </button>
                <button type="submit" disabled={loading} className="w-2/3 bg-[#CE1212] hover:bg-[#a30e0e] text-white py-4 rounded-xl font-medium transition-all shadow-md flex justify-center items-center">
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Confirm Reservation"}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="text-4xl text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Reservation Confirmed!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">We've sent the details to your email. We look forward to serving you.</p>
              <button onClick={() => setStep(1)} className="bg-[#CE1212] hover:bg-[#a30e0e] text-white px-8 py-3 rounded-full font-medium transition-all">
                Make Another Booking
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Reservation;
