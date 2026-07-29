import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getToken } = useAuth();
  
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Food',
    image: null
  });

  const fetchImages = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/gallery`);
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleOpenAdd = () => {
    setFormData({ caption: '', category: 'Food', image: null });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      toast.loading("Deleting...", { id: 'delete' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted successfully", { id: 'delete' });
        fetchImages();
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
    if (!formData.image) {
      return toast.error("Image file is required");
    }
    try {
      toast.loading("Uploading...", { id: 'save-img' });
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const fd = new FormData();
      fd.append('caption', formData.caption);
      fd.append('category', formData.category);
      fd.append('image', formData.image);

      const res = await fetch(`${apiUrl}/gallery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fd
      });
      
      if (res.ok) {
        toast.success("Uploaded successfully!", { id: 'save-img' });
        setIsModalOpen(false);
        fetchImages();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to upload: ${errorData.message || 'Unknown error'}`, { id: 'save-img' });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", { id: 'save-img' });
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
          <h2 className="font-['EB_Garamond'] text-4xl text-white/90 italic">Gallery</h2>
          <p className="text-sm font-light text-white/50 mt-2">Manage portfolio imagery for food, interior, and events.</p>
        </div>
        <button onClick={handleOpenAdd} className="px-6 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold mt-4 md:mt-0 whitespace-nowrap flex-shrink-0">
          + Upload Image
        </button>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white/10 animate-pulse border border-white/5"></div>
          ))
        ) : images.length === 0 ? (
          <div className="col-span-full p-8 text-center text-white/50">No images found.</div>
        ) : (
          images.map((img) => (
            <div key={img._id} className="relative aspect-square rounded-xl overflow-hidden group bg-white/5 border border-white/10">
              <img src={img.image} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                <button onClick={() => handleDelete(img._id)} className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest bg-black/50 px-3 py-2 rounded">Delete</button>
              </div>
              <div className="absolute bottom-2 left-2 z-20">
                <span className="text-[8px] uppercase tracking-widest bg-black/50 text-[#c5a059] px-2 py-1 rounded backdrop-blur-sm">{img.category || 'Food'}</span>
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
              <h3 className="font-['EB_Garamond'] text-3xl text-white/90 italic mb-6">Upload Image</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Image File</label>
                  <input required type="file" accept="image/*" onChange={e => setFormData({...formData, image: e.target.files[0]})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Caption (Optional)</label>
                  <input type="text" placeholder="e.g. Signature Truffle Pasta" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c5a059] outline-none">
                    <option value="Food">Food</option>
                    <option value="Interior">Interior</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-3 text-white/50 hover:text-white transition-colors text-sm font-medium">Cancel</button>
                  <button type="submit" className="px-8 py-3 bg-[#c5a059] text-[#050505] rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-[0.2em] font-bold">Upload</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminGallery;
