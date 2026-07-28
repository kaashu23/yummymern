import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    guestName: '',
    rating: 5,
    quote: '',
    isFeatured: false,
    photo: null
  });

  const fetchTestimonials = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/testimonials`);
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ guestName: '', rating: 5, quote: '', isFeatured: false, photo: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({ 
      guestName: testimonial.guestName, 
      rating: testimonial.rating || 5, 
      quote: testimonial.quote, 
      isFeatured: testimonial.isFeatured || false,
      photo: null 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchTestimonials();
      } else {
        toast.error("Failed to delete", { id: 'delete' });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting", { id: 'delete' });
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      toast.loading("Updating...", { id: 'update' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const fd = new FormData();
      fd.append('isFeatured', !currentStatus);
      const res = await fetch(`${apiUrl}/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      if (res.ok) {
        toast.success("Updated successfully", { id: 'update' });
        fetchTestimonials();
      } else {
        toast.error("Failed to update", { id: 'update' });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating", { id: 'update' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-testimonial' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/testimonials/${editingId}` : `${apiUrl}/testimonials`;
      const method = editingId ? 'PUT' : 'POST';

      const fd = new FormData();
      fd.append('guestName', formData.guestName);
      fd.append('rating', formData.rating);
      fd.append('quote', formData.quote);
      fd.append('isFeatured', formData.isFeatured);
      if (formData.photo) {
        fd.append('photo', formData.photo);
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fd
      });
      
      if (res.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-testimonial' });
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-testimonial' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-testimonial' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Testimonials</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage featured guest quotes for the landing page.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Add Testimonial
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {testimonials.map((review) => (
          <div key={review._id} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {review.photo && (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={review.photo} alt={review.guestName} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-['EB_Garamond'] text-xl text-white/90">{review.guestName}</h3>
                    <div className="text-[#c5a059] text-xs">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</div>
                  </div>
                </div>
                {review.isFeatured && (
                  <span className="text-[9px] uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 px-3 py-1 rounded-full">Featured</span>
                )}
              </div>
              <p className="text-sm font-light text-white/50 italic mb-6">"{review.quote}"</p>
            </div>
            <div className="flex justify-end gap-4 border-t border-white/10 pt-4">
              <button onClick={() => handleToggleFeatured(review._id, review.isFeatured)} className="text-xs text-[#c5a059] hover:text-white transition-colors">{review.isFeatured ? 'Unfeature' : 'Feature'}</button>
              <button onClick={() => handleOpenEdit(review)} className="text-xs text-white/60 hover:text-white transition-colors">Edit</button>
              <button onClick={() => handleDelete(review._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-full p-8 text-center text-white/50">No testimonials found.</div>
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
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Guest Name</label>
                  <input required type="text" value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Rating (1-5)</label>
                  <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Quote</label>
                  <textarea required value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none min-h-[80px]" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Guest Photo {editingId && "(Optional to replace)"}</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, photo: e.target.files[0]})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex items-center gap-3 mt-2 cursor-pointer" onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}>
                  <input type="checkbox" checked={formData.isFeatured} readOnly className="w-4 h-4 accent-[#c5a059] cursor-pointer" />
                  <span className="text-sm text-white/70 select-none">Feature on Landing Page</span>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Testimonial"}
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

export default AdminTestimonials;
