import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    photo: null
  });

  const fetchChefs = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/chefs`);
      const data = await res.json();
      setChefs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', role: '', bio: '', photo: null });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (chef) => {
    setEditingId(chef._id);
    setFormData({ name: chef.name, role: chef.role, bio: chef.bio, photo: null });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this chef?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/chefs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchChefs();
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
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-chef' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/chefs/${editingId}` : `${apiUrl}/chefs`;
      const method = editingId ? 'PUT' : 'POST';

      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('role', formData.role);
      fd.append('bio', formData.bio);
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
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-chef' });
        setIsModalOpen(false);
        fetchChefs();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-chef' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-chef' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Chefs</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage the culinary team profiles.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Add Chef
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center text-center animate-pulse min-h-[220px]">
              <div className="w-24 h-24 rounded-full bg-white/10 mb-4"></div>
              <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
              <div className="h-3 w-20 bg-white/5 rounded mb-6"></div>
              <div className="w-full flex justify-between border-t border-white/10 pt-4 mt-auto">
                <div className="h-4 w-8 bg-white/10 rounded"></div>
                <div className="h-4 w-12 bg-white/10 rounded"></div>
              </div>
            </div>
          ))
        ) : chefs.length === 0 ? (
          <div className="col-span-full p-8 text-center text-white/50">No chefs found.</div>
        ) : (
          chefs.map((chef, idx) => (
            <div key={chef._id || idx} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/10 mb-4 overflow-hidden border border-white/20">
                {chef.photo && <img src={chef.photo} alt={chef.name} className="w-full h-full object-cover" />}
              </div>
              <h3 className="font-['EB_Garamond'] text-2xl text-white/90 mb-1">{chef.name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#c5a059] mb-6">{chef.role}</p>
              <div className="w-full flex justify-between border-t border-white/10 pt-4 mt-auto">
                <button onClick={() => handleOpenEdit(chef)} className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
                <button onClick={() => handleDelete(chef._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            </div>
          ))
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
                {editingId ? "Edit Chef" : "Add Chef"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Role</label>
                  <input required type="text" placeholder="e.g. Executive Chef" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Bio</label>
                  <textarea required value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none min-h-[100px]" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Chef Photo {editingId && "(Optional to replace)"}</label>
                  <input type="file" accept="image/*" onChange={e => setFormData({...formData, photo: e.target.files[0]})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Chef"}
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

export default AdminChefs;
