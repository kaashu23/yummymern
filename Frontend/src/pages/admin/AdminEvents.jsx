import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    seatsAvailable: '',
    image: null
  });

  const fetchEvents = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', date: '', time: '', seatsAvailable: '', image: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event) => {
    setEditingId(event._id);
    const eventDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
    setFormData({ 
      title: event.title, 
      description: event.description || '', 
      date: eventDate, 
      time: event.time || '', 
      seatsAvailable: event.seatsAvailable || '',
      image: null // Can't pre-fill file input
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchEvents();
      } else {
        toast.error("Failed to delete", { id: 'delete' });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting", { id: 'delete' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-event' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/events/${editingId}` : `${apiUrl}/events`;
      const method = editingId ? 'PUT' : 'POST';

      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('date', formData.date);
      fd.append('time', formData.time);
      fd.append('seatsAvailable', formData.seatsAvailable);
      if (formData.image) {
        fd.append('image', formData.image);
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fd
      });
      
      if (res.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-event' });
        setIsModalOpen(false);
        fetchEvents();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-event' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-event' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Events</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage upcoming dining experiences.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Add Event
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {events.map((event) => (
          <div key={event._id} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex gap-4 items-start">
            {event.image && (
               <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
               </div>
            )}
            <div className="flex-grow">
              <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mb-2">{event.title}</h3>
              <p className="text-sm font-light text-white/50 mb-1">
                {event.date ? new Date(event.date).toLocaleDateString() : ''} {event.time ? `• ${event.time}` : ''}
              </p>
              <p className="text-sm font-light text-white/50 mb-4">Seats: {event.seatsAvailable}</p>
              <div className="flex gap-4">
                <button onClick={() => handleOpenEdit(event)} className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(event._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full p-8 text-center text-white/50">No events found.</div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 w-[95%] md:w-[600px] max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <h3 className="font-['EB_Garamond'] text-3xl text-white/90 italic mb-6">
                {editingId ? "Edit Event" : "Add Event"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Event Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none min-h-[80px]" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col flex-1">
                    <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Date</label>
                    <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Time</label>
                    <input type="text" placeholder="e.g. 19:00" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Seats Available</label>
                  <input type="number" min="1" value={formData.seatsAvailable} onChange={e => setFormData({...formData, seatsAvailable: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Event Image {editingId && "(Optional to replace)"}</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEvents;
