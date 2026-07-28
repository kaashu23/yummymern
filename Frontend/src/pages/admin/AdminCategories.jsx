import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    name: ''
  });

  const fetchCategories = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/categories`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({ name: cat.name });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchCategories();
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
    if (!formData.name) return;
    
    try {
      toast.loading(editingId ? "Updating..." : "Adding...", { id: 'save-cat' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const url = editingId ? `${apiUrl}/categories/${editingId}` : `${apiUrl}/categories`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: formData.name })
      });
      
      if (res.ok) {
        toast.success(editingId ? "Updated successfully!" : "Added successfully!", { id: 'save-cat' });
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.message || 'Unknown error'}`, { id: 'save-cat' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-cat' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Categories</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage menu categories and sections.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Add Category
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {categories.map((cat) => (
          <div key={cat._id} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-[#c5a059]/50 transition-colors flex justify-between items-center">
            <h3 className="font-['EB_Garamond'] text-2xl text-white/90">{cat.name}</h3>
            <div className="flex gap-4">
              <button onClick={() => handleOpenEdit(cat)} className="text-xs text-[#c5a059] hover:text-white transition-colors">Edit</button>
              <button onClick={() => handleDelete(cat._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full p-8 text-center text-white/50">No categories found.</div>
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
                {editingId ? "Edit Category" : "Add Category"}
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Category Name</label>
                  <input required type="text" placeholder="e.g. Appetizers" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">
                    {editingId ? "Save Changes" : "Save Category"}
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

export default AdminCategories;
